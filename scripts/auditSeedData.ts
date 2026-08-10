import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { addCardSchema } from '../src/modules/payment/payment.schema.js';
import { updateProfileSchema } from '../src/modules/users/users.schema.js';
import { ENUM_REGISTRY } from '../src/modules/enums/enums.registry.js';

const SEED_DATA_DIR = path.join(process.cwd(), 'scripts', 'data');
const SEEDERS_DIR = path.join(process.cwd(), 'scripts', 'seeders');

function findSeedDataImports(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const seederFiles = fs.readdirSync(SEEDERS_DIR).filter((f) => f.endsWith('.ts'));
  const importRegex = /['"]([\w.-]+\.seed\.json)['"]/g;

  for (const seederFile of seederFiles) {
    const content = fs.readFileSync(path.join(SEEDERS_DIR, seederFile), 'utf-8');
    let match: RegExpExecArray | null;
    while ((match = importRegex.exec(content))) {
      const jsonFile = match[1]!;
      if (!map.has(jsonFile)) map.set(jsonFile, []);
      map.get(jsonFile)!.push(seederFile);
    }
  }
  return map;
}

const cardContract = addCardSchema.extend({
  cardNumber: z.string().regex(/^\d{16}$/),
  cardHolder: z.string().min(1),
  cvv: z.string().regex(/^\d{3,4}$/),
  balance: z.number().nonnegative(),
  currency: z.enum(ENUM_REGISTRY['currencies'] as [string, ...string[]]),
  status: z.string(),
  forcedResult: z.any().nullable(),
}).refine((c) => (ENUM_REGISTRY as any)['card-brands']?.includes(c.brand) ?? true, {
  message: 'brand not in current card-brands enum',
});

const personalInfoShape = (updateProfileSchema.shape.personalInfo as any).unwrap().shape;
const driverLicenseShape = (updateProfileSchema.shape.driverLicense as any).unwrap().shape;
const passportShape = (updateProfileSchema.shape.passport as any).unwrap().shape;

const userProfileContract = z.object({
  dateOfBirth: personalInfoShape.dateOfBirth,
  address: personalInfoShape.address,
  idNumber: personalInfoShape.idNumber,
  driverLicenseNumber: driverLicenseShape.licenseNumber,
  driverLicenseExpiry: driverLicenseShape.expiryDate,
  passportNumber: passportShape.passportNumber,
  passportExpiry: passportShape.expiryDate,
});

const addressesContract = z.object({
  ADDRESS_SCREEN: z.array(z.string().min(3)).min(1),
  DELIVERY_ADDRESS_SCREEN: z.array(z.string().min(3)).min(1),
});

const reviewCommentsContract = z.array(z.string().min(3)).min(1);

const CONTRACTS: Record<string, z.ZodTypeAny> = {
  'cards.seed.json': z.array(cardContract),
  'user-profiles.seed.json': z.array(userProfileContract),
  'addresses.seed.json': addressesContract,
  'review-comments.seed.json': reviewCommentsContract,
};

const DOMAIN_DATA_DIR = path.join(process.cwd(), 'scripts', 'data');

const categoryEntryContract = z.object({
  serviceType: z.enum(ENUM_REGISTRY['service-types'] as [string, ...string[]]),
  name: z.object({ az: z.string().min(1), en: z.string().min(1), ru: z.string().min(1) }),
});

function auditDomainDataFile(filename: string, contract: z.ZodTypeAny) {
  const filePath = path.join(DOMAIN_DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return { ok: false, errors: [`MISSING FILE: scripts/data/${filename}`] };
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const result = contract.safeParse(raw);
  if (!result.success) {
    return { ok: false, errors: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`) };
  }
  return { ok: true, errors: [] };
}

function auditFile(filename: string): { ok: boolean; raw: unknown; errors: string[] } {
  const filePath = path.join(SEED_DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return { ok: false, raw: undefined, errors: [`MISSING FILE: ${filename}`] };
  }
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const contract = CONTRACTS[filename];
  if (!contract) {
    return { ok: false, raw, errors: [`NO CONTRACT DEFINED for ${filename} — add one to CONTRACTS`] };
  }
  const result = contract.safeParse(raw);
  if (!result.success) {
    return { ok: false, raw, errors: result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`) };
  }
  return { ok: true, raw, errors: [] };
}

function reconcile(filename: string, raw: unknown): unknown {
  if (filename === 'cards.seed.json' && Array.isArray(raw)) {
    return raw.map((card: any) => ({
      currency: 'AZN',
      ...card, 
    }));
  }
  return raw;
}

async function main() {
  const fixMode = process.argv.includes('--fix');
  const importMap = findSeedDataImports();
  let hasErrors = false;

  console.log('🔍 Auditing seed data...\n');

  for (const [jsonFile, importedBy] of importMap.entries()) {
    let { ok, raw, errors } = auditFile(jsonFile);

    if (!ok && fixMode && raw !== undefined) {
      const fixedRaw = reconcile(jsonFile, raw);
      const contract = CONTRACTS[jsonFile];
      const retryResult = contract?.safeParse(fixedRaw);
      if (retryResult?.success) {
        fs.writeFileSync(
          path.join(SEED_DATA_DIR, jsonFile),
          JSON.stringify(fixedRaw, null, 2) + '\n',
        );
        console.log(`🔧 FIXED: ${jsonFile} (auto-reconciled, re-validated OK)`);
        ok = true;
        errors = [];
      }
    }

    if (ok) {
      console.log(`✅ ${jsonFile} — used by [${importedBy.join(', ')}]`);
    } else {
      hasErrors = true;
      console.error(`❌ ${jsonFile} — used by [${importedBy.join(', ')}]`);
      for (const err of errors) console.error(`   - ${err}`);
    }
  }

  if (fs.existsSync(SEED_DATA_DIR)) {
    const filesOnDisk = fs.readdirSync(SEED_DATA_DIR).filter((f) => f.endsWith('.seed.json'));
    for (const file of filesOnDisk) {
      if (!importMap.has(file)) {
        console.warn(`⚠️  ORPHAN: ${file} exists in seed-data/ but is not imported by any seeder`);
      }
    }
  }

  console.log('\n🔍 Auditing domain seed data (scripts/data/)...\n');
  const { ok: okCategories, errors: errorsCategories } = auditDomainDataFile('categories.json', z.array(categoryEntryContract));
  if (okCategories) {
    console.log('✅ categories.json');
  } else {
    hasErrors = true;
    console.error('❌ categories.json');
    for (const err of errorsCategories) console.error(`   - ${err}`);
  }

  console.log(hasErrors ? '\n❌ Seed data audit FAILED.' : '\n✅ Seed data audit passed — seeders and JSON are in sync.');
  process.exit(hasErrors ? 1 : 0);
}

main();
