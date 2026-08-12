# PART 3 — Mətn sahələrinin lokalizasiyası (i18n)

> Bu sənəd bir implementasiya tapşırığıdır (prompt). Bu, **Part 1 (`order` sahəsi)** və **Part 2 (Explore üçün ortaq model)** sənədlərinin davamıdır və hər ikisinin tamamlanmış olduğunu fərz edir. Məqsəd: hazırda bazada saxlanan bütün istifadəçi-yönlü mətn sahələrinin (`title`, `name`, `description`, `priceSuffix`, kateqoriya adları, home bölmə başlıqları və s.) yalnız **bir dildə** (adətən sənəd yaradılarkən istifadə olunan dildə) saxlanmasının qarşısını almaq və bu sahələri **çoxdilli (localized)** struktura keçirmək — beləliklə API cavabı sorğunu edən klientin dilinə uyğun mətni qaytarsın, "hansı dildə daxil edilibsə o dildə gəlir" problemini aradan qaldırsın.

## 0. Kontekst və mövcud problem

Hazırda mətn sahələri (məs. hotel adı, açıqlama, kateqoriya adı) sadə `string` kimi saxlanılır. Bu sahə bazaya necə yazılıbsa (hansı dildə admin daxil edibsə), bütün istifadəçilərə **eyni dildə** qaytarılır — istifadəçinin cihazının/sorğusunun dilindən asılı olmayaraq. Bu:

- Tətbiqin interfeysi (header, düymələr, statik mətnlər) çoxdilli ola bilsə belə, **backend-dən gələn dinamik data** (hotel adları, açıqlamalar, kateqoriyalar, `priceSuffix` və s.) həmişə tək dildə qalır.
- Fərqli dildə istifadəçi üçün natamam/qarışıq təcrübə yaranır (interfeys bir dildə, data başqa dildə).
- Admin panelində məzmunu tərcümə edib fərqli dillərdə saxlamaq üçün heç bir struktur mövcud deyil.

**Həll:** Bütün istifadəçi-yönlü mətn sahələrini `string` tipindən **`LocalizedString`** (dil kodu → mətn map-i) tipinə keçir. Sorğu zamanı client-in istədiyi dili müəyyən et (header vasitəsilə), backend response mapper-də uyğun dildəki mətni seçib **sadə `string`** kimi qaytar (klient tərəf `LocalizedString` obyekti ilə işləməli deyil — o, artıq seçilmiş, hazır mətni alır).

## 1. Toxunulacaq təbəqələr (agentə qeyd)

Əvvəlcə real strukturu təsdiqlə, sonra dəyiş:

- `src/shared/types/` və ya `src/shared/dto/` — yeni `LocalizedString` tipinin təyin olunacağı yer.
- `src/shared/enums.ts` / `language.ts` — dəstəklənən dillərin siyahısı üçün (əgər mövcuddursa, təsdiqlə; yoxdursa yarat).
- Middleware qovluğu (`src/middlewares/` və ya `src/common/middlewares/`) — dil təyin edən middleware üçün.
- Hər servis modulunun (`hotel`, `rentacar`, `food`, `travel`, `categories`) `*.schema.ts`, `*.types.ts` faylları — mətn sahələrinin tiplərini dəyişmək üçün.
- Part 1 və Part 2-də yaradılmış/dəyişdirilmiş bütün response mapper funksiyaları (`toExploreCard()` daxil olmaqla) — bunlar indi lokalizasiya seçimini tətbiq etməlidir.
- `src/config/collections.ts`, home bölmə konfiqurasiyası (`homeSections` kolleksiyası, Part 1-dən) — bölmə başlıqları da (`key`-in insan-oxunan adı, əgər göstərilirsə) lokalizasiya tələb edə bilər.

## 2. Dəstəklənən dillər və `LocalizedString` tipi

### 2.1 Dil siyahısını təsdiqlə

Əvvəlcə mövcud kodda/mobil-web tərəfdə hansı dillərin artıq dəstəkləndiyini tap (adətən statik mətnlər üçün `i18n`/`locales` qovluğu tətbiqin frontend/mobil layihələrində olur — backend komandasından və ya mövcud sənədlərdən bunu dəqiqləşdir). Ümumi fərziyyə olaraq bu sənəddə **Azərbaycan (`az`), İngilis (`en`), Rus (`ru`)** dillərini nümunə kimi istifadə edirəm — implementasiyanı edən agent bunu **faktiki dəstəklənən dillərlə əvəz etməlidir**, sadəcə konsepsiyanı saxlasın.

```ts
enum SupportedLanguage {
  AZ = 'az',
  EN = 'en',
  RU = 'ru',
}

const DEFAULT_LANGUAGE = SupportedLanguage.AZ; // hazırkı data-nın əksəriyyəti hansı dildədirsə, o default olmalıdır
```

### 2.2 `LocalizedString` tipi

```ts
type LocalizedString = Partial<Record<SupportedLanguage, string>>;
// məs: { az: 'Otel Bakı', en: 'Baku Hotel', ru: 'Отель Баку' }
```

`Partial` olması vacibdir — **bütün dillərdə tərcümə olması məcburi deyil**. Admin bir sahəni yalnız `az` dilində doldurub, digərlərini boş buraxa bilər (aşağıda fallback məntiqi bunu idarə edəcək).

### 2.3 Hansı sahələr lokalizasiya olunmalıdır (allowlist)

Aşağıdakı sahə tipləri lokalizasiya tələb edir — implementasiyanı edən agent hər servis sənədini gəzib bu kateqoriyalara uyğun **bütün** sahələri siyahıya almalıdır, bu sənəddə sadalananlar nümunədir, tam siyahı deyil:

- Adlar/başlıqlar: `title`, `name`.
- Açıqlamalar: `description`.
- Part 2-dən gələn `priceSuffix`.
- Kateqoriya adları (`categories` kolleksiyasındakı `name`).
- Home bölmə konfiqurasiyasında (`homeSections`) əgər bölmənin insan-oxunan başlığı ayrıca saxlanılırsa (`title`/`label` kimi bir sahə, `key`-dən fərqli olaraq — `key` texniki identifikator olduğu üçün lokalizasiya olunMAmalıdır, sadəcə `title`/`label` olunmalıdır).

**Lokalizasiya OLUNMAMALI** sahələr: ID-lər, enum dəyərləri (`serviceType`, `key`), rəqəmsal sahələr (`price`, `rating`, `order`), URL-lər (`image`), tarixlər. Bunları səhvən lokalizasiya obyektinə çevirmə.

## 3. Backend məntiqi dəyişiklikləri

### 3.1 Dilin müəyyən edilməsi (middleware)

Yeni bir middleware yaz (məs. `src/middlewares/language.middleware.ts`):

- HTTP request-dən dili oxu. Prioritet ardıcıllığı: (1) əgər tətbiqdə xüsusi bir header istifadə olunursa (məs. `X-App-Language` — mövcud kodda belə bir konvensiya varsa onu istifadə et, yoxdursa yenisini təyin et), (2) standart `Accept-Language` header-i, (3) heç biri yoxdursa `DEFAULT_LANGUAGE`.
- Oxunan dəyəri `SupportedLanguage` enum-una qarşı yoxla — dəstəklənməyən dil kodu gələrsə (məs. client `fr` göndərsə, sistemdə `fr` yoxdursa), sakitcə `DEFAULT_LANGUAGE`-ə fallback et, **heç vaxt 400 error qaytarma** (dil seçimi UX üçündür, request-i bloklamamalıdır).
- Nəticəni request obyektinə əlavə et (məs. `req.lang: SupportedLanguage`), sonrakı bütün controller/service/mapper qatları bunu buradan oxusun.

### 3.2 Lokalizasiya seçim funksiyası (resolver)

Ortaq bir utility funksiya yaz (məs. `src/shared/utils/localize.ts`):

```ts
function resolveLocalized(
  value: LocalizedString | undefined,
  lang: SupportedLanguage,
): string {
  if (!value) return '';
  return value[lang] ?? value[DEFAULT_LANGUAGE] ?? Object.values(value)[0] ?? '';
}
```

Fallback zənciri vacibdir: (1) istənilən dil, (2) default dil, (3) mövcud olan istənilən ilk dil, (4) boş string (heç vaxt `undefined`/`null` qaytarma, klient tərəfdə crash-ə səbəb olmasın). **Bu funksiya bütün mapper-lərdə təkrar-təkrar yazılmamalı, mərkəzi yerdən import olunmalıdır.**

### 3.3 Mövcud mapper-lərin yenilənməsi

Part 2-dəki `toExploreCard()` funksiyası daxil olmaqla, **bütün** public response mapper-lər indi belə işləməlidir:

```ts
title: resolveLocalized(doc.title, req.lang),
priceSuffix: resolveLocalized(doc.priceSuffix, req.lang),
// ... digər lokalizasiya olunan sahələr
```

Mapper funksiyalarının imzasına `lang: SupportedLanguage` parametri əlavə et (controller-dən `req.lang`-ı ötür). **Diqqət:** bu, Part 2-də yazılan mapper-lərin imzasını dəyişəcək — implementasiyanı edən agent Part 2-nin kodunu bu addımda geriyə uyğun (backward compatible) şəkildə yeniləməlidir, təzədən yazmaq lazım deyil, sadəcə parametr əlavə olunur.

### 3.4 Admin CRUD endpoint-lərinin yenilənməsi

Admin create/update DTO-larında lokalizasiya olunan sahələr indi `string` yox, obyekt qəbul etməlidir:

```ts
title: z.object({
  az: z.string().min(1), // default dil məcburidir
  en: z.string().optional(),
  ru: z.string().optional(),
}),
```

Default dil (`az`) **məcburi** olmalıdır (boş sənəd yaranmasın), digər dillər **opsional**. Admin panelin bu formanı necə göstərəcəyi bu sənədin əhatəsindən kənardır, amma backend kontraktı bunu dəstəkləməlidir.

### 3.5 Admin-yönlü GET endpoint-ləri

Admin panelə məlumat qaytaran endpoint-lər (əgər varsa, redaktə üçün) lokalizasiya sahələrini **tam obyekt formasında** (bütün dillərlə birlikdə) qaytarmalıdır, `resolveLocalized()` tətbiq olunmamalıdır — çünki admin bütün dilləri eyni anda redaktə etməlidir. Yalnız **public-yönlü** endpoint-lər (`GET /api/home`, `GET /api/explore`, servis detalları) `resolveLocalized()` tətbiq edib tək dildə string qaytarmalıdır.

## 4. Tərcümə məzmununun mənbəyi haqqında qeyd

Bu tapşırığın əhatəsinə **avtomatik tərcümə (AI/translation API inteqrasiyası) daxil deyil** — YAGNI: hazırkı tələb strukturu qurmaqdır, mövcud olmayan dillərdəki mətinləri avtomatik doldurmaq deyil. Miqrasiyadan sonra digər dillər (`en`, `ru`) sadəcə boş qalacaq, `resolveLocalized()` bu halda default dilə fallback edəcək (Bölmə 3.2-yə bax) — yəni miqrasiyadan dərhal sonra istifadəçi təcrübəsi **pozulmayacaq** (hər kəs default dili görməyə davam edəcək, tərcümələr admin tərəfindən tədricən əlavə olunana qədər). Gələcəkdə tərcümə xidməti inteqrasiyası düşünülərsə, bunu ayrı bir tapşırıq kimi planlaşdır, kod komментарında `// TODO: avtomatik tərcümə inteqrasiyası üçün gələcək iş` qeydini burax, indi implement ETMƏ.

## 5. Seed / Miqrasiya tələbləri

### 5.1 Miqrasiya scriptinin tələbləri

Yeni bir script yaz (məs. `scripts/migrations/localizeTextFields.ts`):

- Bölmə 2.3-də sadalanan **bütün** kolleksiyaları və **bütün** lokalizasiya olunacaq sahələri gəzsin.
- Hər sənəd üçün, hər lokalizasiya olunacaq sahə üzrə:
  - **Əgər sahənin dəyəri hazırda sadə `string`-dirsə** (köhnə format): dəyəri `{ [DEFAULT_LANGUAGE]: mövcudDəyər }` formasına çevir (yəni mövcud mətn itmir, default dilin altına köçürülür).
  - **Əgər sahənin dəyəri artıq obyektdirsə** (yəni script təkrar işə düşüb, ya da sahə artıq lokalizasiya olunubsa): TOXUNMA, ötür (idempotent).
  - **Əgər sahə heç mövcud deyilsə** (`undefined`): boş `{}` və ya default dil üçün boş string ilə doldur, amma bu halın niyə baş verdiyini (məlumat itkisi ola bilər) logla, xəbərdarlıq çap et.
- Tip yoxlaması diqqətli olmalıdır: `typeof value === 'string'` ilə `typeof value === 'object'` arasında fərqi düzgün aşkar et, Firestore-dan gələn `Timestamp` və digər xüsusi obyekt tiplərini səhvən "artıq lokalizasiya olunub" kimi qəbul etmə (bu, yalnız açıq şəkildə Bölmə 2.3-də sadalanan mətn sahələrinə tətbiq olunmalıdır, sənədin bütün sahələrini "kor-koranə" gəzmə).
- Batch write, 500 limit qaydası, hər kolleksiya üçün statistika çapı, `--dry-run` dəstəyi — Part 1 və Part 2-dəki eyni qaydalar burada da keçərlidir.
- **Şəkillərə və qeyri-mətn sahələrinə (`price`, `order`, `rating`, ID-lər) əsla toxunma.**

### 5.2 İcra ardıcıllığı

Bu miqrasiya **yalnız** Part 1 və Part 2-dəki miqrasiyalar tamamlandıqdan sonra işə salınmalıdır, çünki Part 2-də `priceSuffix` kimi yeni sahələr əlavə olunur — həmin sahələr əvvəlcə mövcud olmalıdır ki, bu miqrasiya onları da lokalizasiya formasına çevirə bilsin. `package.json`-a ardıcıl işə salına bilən script-lər əlavə et:

```
"migrate:order": "tsx scripts/migrations/addOrderField.ts",
"migrate:explore": "tsx scripts/migrations/backfillExploreFields.ts",
"migrate:i18n": "tsx scripts/migrations/localizeTextFields.ts"
```

## 6. Test / qəbul meyarları (Definition of Done)

- [ ] Bölmə 2.3-də sadalanan bütün mətn sahələri bazada `LocalizedString` (obyekt) formatındadır, köhnə sadə `string` formatı qalmayıb.
- [ ] `GET /api/home`, `GET /api/explore` və digər public endpoint-lər müştərinin göndərdiyi dil header-inə uyğun **tək dildə, sadə string** mətn qaytarır (obyekt formatında yox).
- [ ] Dəstəklənməyən/boş dil header-i göndərildikdə sistem default dilə fallback edir, error qaytarmır.
- [ ] Tərcüməsi olmayan sahələr üçün default dilə fallback işləyir, boş/undefined mətn heç vaxt klientə getmir.
- [ ] Admin-yönlü GET endpoint-ləri lokalizasiya sahələrini bütün dillərlə (tam obyekt) qaytarır.
- [ ] Admin CREATE/UPDATE endpoint-ləri lokalizasiya obyektini qəbul edir, default dil məcburi, digərləri opsionaldır.
- [ ] Miqrasiya scripti bir dəfə işlədildikdən sonra bütün mövcud mətnlər itmədən default dilin altına köçürülüb.
- [ ] Miqrasiya scriptini təkrar işə salmaq artıq lokalizasiya olunmuş sahələri dəyişmir/pozmur (idempotent).
- [ ] Şəkil, qiymət, reytinq, order, ID kimi qeyri-mətn sahələri miqrasiyadan təsirlənməyib.
- [ ] Part 2-dəki mapper funksiyaları (`toExploreCard()` və s.) yeni `lang` parametrini qəbul edir və düzgün tətbiq edir.
