# PART 2 — Explore bölməsi üçün ortaq (unified) kart modeli və çirkli/strukturasız datanın təmizlənməsi

> Bu sənəd bir implementasiya tapşırığıdır (prompt). Bu, **Part 1 (`order` sahəsi)** sənədinin davamıdır və Part 1-in tamamlanmış olduğunu fərz edir (yəni bütün servis sənədlərində artıq `order: number` sahəsi mövcuddur). Məqsəd: Explore (kəşf) siyahısında hər servisin (`hotel`, `rentacar`, `food`, `travel`, və gələcəkdə əlavə olunacaq istənilən servis tipi) öz kartını fərqli, strukturasız, "arxada boş yerə tullanan" sahələrlə deyil, **tək, ortaq, əvvəlcədən müəyyənləşdirilmiş bir "Explore Card" modeli** ilə qaytarmaq. Klient (mobil/web) tərəf yalnız bir strukturu bilməli, servis tipindən asılı olmayaraq eyni sahələri render etməlidir.

## 0. Kontekst və mövcud problem

Hazırda `GET /api/explore` (və ya oxşar aggregator endpoint) hər servis tipi üçün öz "featured/list" sorğusunun nəticəsini demək olar ki, xam (raw) formada, və ya yarımçıq map edilmiş formada qaytarır. Bunun nəticəsində:

- Hər servis üçün cavabın forması fərqlidir (məs. `hotels` cavabında `pricePerNight` adlı sahə var, `rentacar` cavabında `dailyPrice`, `travel` cavabında bəlkə `packagePrice` — adlar da, strukturlar da fərqlidir).
- Cavabın içində klient üçün heç bir dəyəri olmayan, sırf backend/admin məqsədli sahələr də (məs. daxili flag-lər, admin qeydləri, arxiv sahələri) heç filtrlənmədən gəlir — istifadəçi bunu **"içindəki elementlərin əksəri lazımsızdı və arxada boş yerə tullanır, tam strukturasızdır"** kimi təsvir edib.
- Qiymətin yanında göstərilməli olan **vahid/sufiks** (məs. "gecəlik", "günlük", "adam başı", "paket qiyməti") heç bir servis cavabında struktur şəklində gəlmir — bu ya heç yoxdur, ya da title/description mətninin içinə hardcode yazılıb (məs. `"250 AZN / gecə"` kimi tək bir string, ayrıla bilməyən formada).
- Klient tərəf (mobil/web) buna görə hər servis tipini ayrı-ayrı `if/switch` ilə handle etməyə məcburdur — bu, Part 1-də qeyd olunan "order-i də ayrı-ayrı handle etmək" problemi ilə eyni kök səbəbdən (backend-də ortaq kontrakt olmaması) qaynaqlanır.

**Həll:** Bütün servislər üçün ortaq bir **`ExploreCardDTO`** (adı fərqli ola bilər, məs. `ExploreItemResponse`) modeli təyin et. Hər servis öz xam sənədini bu modelə map edən bir **adapter/mapper funksiyası** ilə çevirsin. Explore aggregator yalnız bu ortaq modeldən ibarət massivi (Part 1-dəki `order` sahəsinə görə sıralanmış) qaytarsın.

## 1. Toxunulacaq təbəqələr (agentə qeyd)

Əvvəlcə real strukturu təsdiqlə, sonra dəyiş:

- Explore aggregator-ın olduğu yer (məs. `src/modules/home/explore.service.ts`, `explore.controller.ts`, `explore.routes.ts`, ya da hər servisin öz modulunda "explore üçün istifadə olunan" funksiyalar — bunları Part 1-dəki tapşırıqda da axtarmışdın, nəticələri buradan istifadə et).
- Hər servis modulunun (`hotel`, `rentacar`, `food`, `travel`, digər mövcud servis tipləri) `*.service.ts` fayllarında, explore üçün istifadə olunan sorğu/mapper funksiyaları.
- `src/shared/types/` və ya `src/shared/dto/` altında ortaq tip təriflərinin saxlanacağı yer (əgər yoxdursa, `src/shared/dto/explore-card.dto.ts` kimi yeni fayl yarat).
- `src/shared/enums.ts` / `serviceType.ts` — mövcud `ServiceType` enum-unu təsdiqlə (hansı servis tipləri var: `HOTEL`, `RENTACAR`, `FOOD`, `TRAVEL`, və s.).
- Hər servisin Firestore sənəd strukturunu (`hotels`, `rentacar`, `food`, `travel` kolleksiyaları) diqqətlə oxu — hazırda qiymətlə bağlı hansı sahələr var, adları nədir, tipi nədir (`number`, `string`, `{amount, currency}` obyekt formatında ola bilər).

## 2. Ortaq "Explore Card" modelinin dizaynı

### 2.1 Minimal sahə siyahısı

İstifadəçinin göstərdiyi minimum tələb olunan sahələr bunlardır (bu, son sahə siyahısı deyil — aşağıda genişləndirilib, amma bunlar **mütləq olmalıdır**):

- `id` — kartın aid olduğu orijinal sənədin ID-si (Firestore document ID).
- `serviceType` — hansı servisə aiddir (`ServiceType` enum dəyəri: `hotel`, `rentacar`, `food`, `travel` və s.).
- `serviceId` — **diqqət:** `id` ilə `serviceId` fərqli məqsəd daşıya bilər. Əgər gələcəkdə bir "explore card" konsepti öz müstəqil sənədi ola bilərsə (məs. `exploreCards` adlı ayrı bir kolleksiya, hər biri bir servisə "işarə edən" sənəd), onda `id` = explore card-ın öz ID-si, `serviceId` = əsl servis sənədinin ID-si olar. **Amma hazırkı tələb üçün YAGNI prinsipinə əməl et**: əgər explore cardlar ayrıca saxlanmırsa (yəni birbaşa `hotels`/`rentacar`/... sənədlərindən "on-the-fly" map olunursa), `id` və `serviceId` eyni dəyəri daşıya bilər — sadəcə API kontraktında ikisini də saxla ki, gələcəkdə ayrılsalar, klient tərəf sındırılmasın.
- `title` — kartın başlığı (**Part 3-dəki lokalizasiya tələbinə uyğun olaraq**, bu sahə gələcəkdə localized formatda gələcək — bu sənəddə hələ ona toxunma, sadəcə struktur elə qur ki, Part 3 tətbiq olunanda `title`-ın tipini `string`-dən `LocalizedString`-ə keçirmək asan olsun, yəni title-ı ayrıca, müstəqil map edilən bir sahə kimi saxla, başqa sahələrin içinə "yapışdırma").
- `image` — kartın əsas şəkli. Tək bir görüntü üçün ya birbaşa `string` (URL), ya da `{ url: string; id?: string }` formatında obyekt (əgər gələcəkdə CDN/thumbnail variantları lazım olacaqsa, obyekt forması daha genişlənə bilən seçimdir — bunu qərar verərkən mövcud kodda şəkillərin necə saxlandığına bax: əgər artıq `images: string[]` kimi array saxlanılırsa, explore kartı üçün sadəcə **birinci/əsas** şəkli çıxarıb tək sahə kimi ver, bütün array-ı göndərmə — explore kartında karusel lazım deyil, bir cover şəkil kifayətdir).
- `price` — əsas göstəriləcək qiymət, `number` (və ya `{ amount: number; currency: string }` formatında, əgər sistemdə çoxlu valyuta dəstəyi varsa/planlaşdırılırsa — mövcud kodda valyuta necə idarə olunduğunu yoxla, əgər hər yerdə sabit tək valyuta (məs. AZN) istifadə olunursa, sadə `number` kifayətdir, artıq mürəkkəbliyə getmə).
- `priceSuffix` (və ya `priceUnit`) — **əsas boşluq budur**: qiymətin yanında göstəriləcək vahid/açıqlama, məs. "/ gecə", "/ gün", "/ adam başı", "paket qiyməti". Bu, sərbəst mətn (`string`) kimi saxlanmalıdır, sabit bir enum kimi YOX — çünki fərqli servis tipləri fərqli, hətta gələcəkdə yeni servis tipləri tamam fərqli sufikslər tələb edə bilər (aşağıda 2.3-də ətraflı).
- `rating` — `{ average: number; count?: number }` formatında (yalnız `average: number` da kifayət edə bilər, əgər review sayını göstərmək tələb olunmursa — mövcud review/rating sisteminin necə saxlandığını yoxla, orada artıq bu strukturlardan biri var, onu təkrarla, yeni bir standart uydurma).
- `category` — kartın aid olduğu kateqoriya, `{ id: string; name: string }` formatında (və ya sadəcə `categoryId`, əgər kateqoriya adının klient tərəfdə ayrıca sorğulanması nəzərdə tutulubsa — lakin performans baxımından, adı da birbaşa explore cavabında vermək daha yaxşıdır ki, klient əlavə sorğu açmasın).
- `order` — Part 1-dən gələn sahə, sort üçün istifadə olunub, cavabda göstərilib-göstərilməyəcəyi Part 1-dəki qərara uyğun olsun (adətən public cavabda göstərilmir, sadəcə backend-də sort üçün istifadə olunur, sonra response mapper-də çıxarılır).

### 2.2 "İkinci price" fərziyyəsi haqqında qeyd

Sənin təsvirində `price` sahəsi siyahıda iki dəfə görünür. Mən bunu belə şərh etmişəm: bir çox e-commerce/booking tipli tətbiqlərdə **cari qiymət** (`price`) ilə yanaşı, əgər endirim varsa, **köhnə/xətli-üstündən-çəkilmiş qiymət** (`oldPrice` / `originalPrice`) də göstərilir. Buna görə modelə **opsional** bir sahə əlavə et:

- `oldPrice?: number` — əgər sənəddə endirim məlumatı varsa (mövcud kodda "discount", "kampaniya", "endirim" adlı bir sahə/məntiq varsa, ordan bəslə). **Əgər hazırda sistemdə endirim konsepti ümumiyyətlə yoxdursa, bu sahəni əlavə ETMƏ** — mövcud olmayan bir konsepti "gələcəkdə lazım olar" deyə əlavə etmə (YAGNI). Bu, sadəcə fərziyyədir, real ehtiyacı sən (implementasiyanı edən) kодda təsdiqlə.

### 2.3 `priceSuffix` üçün servis-səviyyəli qərar

`priceSuffix` sahəsinin dəyərini iki yolla təyin etmək olar — hər ikisini nəzərdən keçir, kod bazasının hazırkı vəziyyətinə uyğun olanı seç:

**Yol A — Sahə kimi hər sənəddə saxlanır (tövsiyə olunur):**
Hər servis sənədinə (`hotels`, `rentacar`, `food`, `travel`) `priceSuffix: string` sahəsi əlavə et (admin panel vasitəsilə dəyişdirilə bilən). Bu ən çevik yoldur, çünki admin istənilən vaxt "gecəlik" yerinə "gecə başına" kimi mətni dəyişə bilər, kod deploy etmək lazım gəlmir. **Diqqət:** bu sahə də Part 3-dəki lokalizasiya tələbinə tabe olacaq (yəni sonda `string` yox, `LocalizedString` olacaq) — buna görə bu sənəddə onu ayrıca, müstəqil sahə kimi dizayn et ki, Part 3 tətbiq olunanda ağrısız keçid olsun.

**Yol B — Backend-də serviceType-a görə sabit map (yalnız Yol A mümkün deyilsə və ya sürətli həll lazımdırsa istifadə et):**
```ts
const DEFAULT_PRICE_SUFFIX: Record<ServiceType, string> = {
  hotel: '/ gecə',
  rentacar: '/ gün',
  food: '',
  travel: 'paket qiyməti',
};
```
Bu yanaşmanın **çatışmazlığı**: admin panelindən dəyişdirilə bilməz, yeni servis tipi əlavə olunanda kodda unudula bilər. Buna görə **Yol A üstünlük təşkil etməlidir**, Yol B yalnız keçid dövründə müvəqqəti fallback kimi istifadə oluna bilər (əgər sənəddə `priceSuffix` sahəsi hələ doldurulmayıbsa, `serviceType`-a görə default dəyər göstər).

## 3. Backend məntiqi dəyişiklikləri

### 3.1 Hər servis üçün adapter/mapper funksiyası

Hər servis modulunda (`hotel.service.ts`, `rentacar.service.ts`, `food.service.ts`, `travel.service.ts`) **tək bir** funksiya yaz, məs. `toExploreCard(doc: HotelDocument): ExploreCardDTO`. Bu funksiya:

- Yalnız Bölmə 2.1-də təyin olunan sahələri çıxarır, başqa heç nə çıxarmır (istifadəçinin qeyd etdiyi "lazımsız sahələrin ekranda boş yerə getməsi" probleminin həlli elə budur — mapper "allowlist" məntiqi ilə işləməlidir: yalnız lazım olan sahələri açıq şəkildə seç, "hər şeyi kopyala, sonra bir neçəsini sil" məntiqi ilə YAZMA, çünki bu yolla yeni, gözlənilməyən sahələr də sızır).
- Əgər mənbə sənəddə lazım olan sahə (məs. `rating`) yoxdursa, mapper təhlükəsiz default qaytarmalıdır (məs. `{ average: 0, count: 0 }`), heç vaxt `undefined`/`null` buraxıb klient tərəfdə crash-ə səbəb olmamalıdır.
- Şəkil sahəsi üçün: əgər mənbə sənəddə `images: string[]` varsa, mapper birinci elementi (və ya ayrıca işarələnmiş "cover"/"main" şəkli, əgər belə bir konsept mövcuddursa) çıxarıb `image` sahəsinə yazsın.

### 3.2 Aggregator-ın yenidən qurulması

Explore aggregator endpoint-i indi belə işləməlidir:

1. Hər servis tipindən uyğun sorğu ilə xam sənədləri çək (Part 1-dəki kimi, `isActive == true` filtri və s. mövcud filterlər qorunsun).
2. Hər sənədi öz servisinə uyğun `toExploreCard()` funksiyası ilə map et.
3. Bütün servislərdən gələn kartları **tək bir massivdə** birləşdir.
4. Part 1-dəki `order` sahəsinə görə sırala (birbaşa Firestore `orderBy` istifadə olunursa hər sorğuda ayrıca, ya da in-memory birləşdirmədən sonra bir dəfə — Part 1 Bölmə 3.2-dəki fallback məntiqini burada da tətbiq et).
5. Yalnız bu ortaq strukturlu massivi cavab kimi qaytar.

Əgər explore-da servis tipinə görə filtrasiya/tab dəstəyi varsa (məs. `GET /api/explore?serviceType=hotel`), bu filter sorğu səviyyəsində tətbiq olunsun, mapper məntiqi dəyişməsin.

### 3.3 Validasiya

- `ExploreCardDTO` üçün Zod (və ya istifadə olunan validasiya kitabxanası) sxemi yaz, mapper-in çıxışını response göndərilməzdən əvvəl bu sxemlə yoxla (development/test mühitində, ən azı) — bu, "arxada boş yerə strukturasız data gedir" probleminin bir daha təkrarlanmamasına zəmanət təbəqəsi olur.
- Admin CREATE/UPDATE DTO-larına `priceSuffix: z.string().optional().default('')` (əgər Yol A seçilibsə) əlavə et.

## 4. Explore ilə Home əlaqəsi

Əgər home səhifəsindəki bölmələr (Part 1-dəki `HomeSectionConfig`) də eyni tip kartları göstərirsə (məs. "Populyar Otellər" bölməsi əslində hotel-lərin explore kartı formasındadır), **eyni `toExploreCard()` mapper funksiyasını home aggregator-da da istifadə et** — iki fərqli yerdə iki fərqli map məntiqi YAZMA. Bu, tam olaraq istifadəçinin bəhs etdiyi "hər yerdə ayrı-ayrı handle etmək" probleminin kök səbəbini aradan qaldırır.

## 5. Seed / Miqrasiya tələbləri

Mövcud data artıq bazada var, amma yeni struktur/sahələr (xüsusilə `priceSuffix`, və mapper-in gözlədiyi digər sahələrin bəziləri) əksər sənədlərdə ya yoxdur, ya natamamdır. İki miqrasiya strategiyası var — vəziyyətə görə birini seç (ya da hər ikisini dəstəklə, flag ilə seçilən):

### 5.1 Strategiya A — Additiv backfill (tövsiyə olunan, təhlükəsiz)

Part 1-dəki miqrasiya scriptinin məntiqinə bənzər, yeni bir script yaz (məs. `scripts/migrations/backfillExploreFields.ts`):

- Hər servis kolleksiyasını gəz.
- Yalnız **çatışmayan** sahələri doldur (məs. `priceSuffix` yoxdursa, Bölmə 2.3-dəki Yol B-dəki default map-dən istifadə edib doldur; `rating` yoxdursa `{average: 0, count: 0}` yaz).
- Mövcud, artıq dolu olan sahələrə TOXUNMA (idempotent olsun).
- **Şəkil sahələrinə əsla toxunma** — bu, istifadəçinin açıq tələbidir, təkrar vurğulanır: `images`, `imageUrl`, `photoId` və bənzər heç bir sahə bu scriptdə oxunmasın belə (yalnız lazım olduqda, mapper-in "birinci şəkli çıxar" məntiqi üçün oxuna bilər, amma DƏYİŞDİRİLMƏSİN, YAZILMASIN).
- Batch write, 500 limit qaydası, `--dry-run` dəstəyi — Part 1-dəki eyni qaydalar burada da keçərlidir.

### 5.2 Strategiya B — Tam silib-yenidən yükləmə (yalnız istifadəçi açıq şəkildə seçərsə)

İstifadəçi qeyd edib ki, istənilsə mövcud sənədləri silib yenidən "düzgün strukturda" push etmək mümkündür, **bir şərtlə: şəkil sahələri toxunulmaz qalmalıdır**. Bu halda script belə işləməlidir:

1. Silinəcək kolleksiyadakı **hər sənəddən əvvəlcə** yalnız `id` və şəkil sahələrini (`images`/`imageUrl`/`photoId`, hansı adla saxlanılırsa) yaddaşa/müvəqqəti JSON-a çıxar (`scripts/migrations/_backup/{collection}-images.json` kimi).
2. Yeni, düzgün strukturlu sənəd datasını hazırla (bu, ya əl ilə hazırlanmış yeni seed JSON-u, ya da köhnə sənədin digər sahələrindən transformasiya yolu ilə qurula bilər — implementasiyanı edən agent bunu istifadəçi ilə dəqiqləşdirməlidir, çünki "düzgün strukturlu yeni data haradan gəlir" sualının cavabı bu sənədin əhatəsindən kənardır).
3. Addım 1-də saxlanılan şəkil sahələrini **eyni `id`-yə görə** yeni sənədlərə geri yaz (əgər yeni sənədlər eyni ID-ni saxlayırsa — Firestore-da mövcud ID-ni saxlayaraq overwrite etmək mümkündür, `set()` istifadə et, `add()` YOX, çünki `add()` yeni təsadüfi ID yaradır və şəkil-sənəd əlaqəsi qırılar).
4. Bu strategiya **geri dönüşü çətin** olduğundan, mütləq `--dry-run` və ayrıca bir təsdiq addımı (məs. terminal-da "yes" yazmaq tələbi) tələb etməlidir, təsadüfən production-da işə düşməsin.

**Qeyd:** Strategiya A default olmalıdır, Strategiya B yalnız açıq tələb olduqda, ehtiyatla işlədilməlidir.

## 6. Test / qəbul meyarları (Definition of Done)

- [ ] `GET /api/explore` (və oxşar bütün endpoint-lər) cavabı, servis tipindən asılı olmayaraq **tam eyni struktur** (`ExploreCardDTO`) daşıyır.
- [ ] Cavabda Bölmə 2.1-də sadalanan sahələrdən başqa heç bir "lazımsız"/daxili sahə görünmür.
- [ ] Hər kartda `price` yanında düzgün `priceSuffix` gəlir (boş string yerinə, servis tipinə uyğun mənalı mətn).
- [ ] Şəkil sahəsi tək, düzgün formatda (`image`) gəlir, bütün `images` array-i deyil.
- [ ] Home səhifəsindəki uyğun bölmələr də eyni mapper funksiyasından istifadə edir (kod təkrarı yoxdur).
- [ ] Admin CREATE/UPDATE endpoint-ləri `priceSuffix` (və Bölmə 2.1/2.2-də əlavə olunan digər yeni sahələri) qəbul edir.
- [ ] Miqrasiya scripti (Strategiya A) bir dəfə işlədildikdən sonra bütün mövcud sənədlərdə lazımi sahələr mövcuddur, şəkil sahələrinə toxunulmayıb.
- [ ] Miqrasiya scriptini təkrar işə salmaq artıq dolu olan sahələri dəyişmir (idempotent).
- [ ] `ExploreCardDTO` validasiya sxemi mövcuddur və mapper çıxışı bu sxemə uyğundur.
