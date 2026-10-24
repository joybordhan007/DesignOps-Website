# DesignOps লাইভ করার গাইড

- **ওয়েবসাইট:** https://designops.agency
- **অ্যাডমিন ড্যাশবোর্ড:** https://admin.designops.agency
- **হোস্টিং:** arhostbd (cPanel)
- **ডোমেইন:** Namecheap

ধাপগুলো উপর থেকে নিচে একটা একটা করে করুন, কোনো ধাপ বাদ দেবেন না। প্রতিটা ধাপের শেষে "✅ ঠিক আছে কিনা দেখুন" অংশে মিলিয়ে নিন, তারপর পরের ধাপে যান।

---

## এক নজরে: কী হবে

```
Namecheap (ডোমেইন) ──► arhostbd হোস্টিং (cPanel)
                          │
                          ├── public_html/                ← আপনার পুরনো ওয়েবসাইট (এটাতে হাত দেবেন না)
                          │
                          ├── designops.agency/           ← নতুন ডোমেইনের ফোল্ডার (cPanel নিজে বানাবে)
                          ├── admin.designops.agency/     ← সাবডোমেইনের ফোল্ডার (cPanel নিজে বানাবে)
                          │
                          └── designops-app/              ← আপনার সাইটের আসল প্রোগ্রাম (Node.js)
                                ├── dist/                 ← ওয়েবসাইটের ফাইল
                                ├── server/               ← সার্ভার + আপনার ডেটা (content, messages, uploads)
                                └── package.json
```

**আপনার পুরনো ওয়েবসাইটের কোনো ক্ষতি হবে না, কারণ:**

- পুরনো সাইট থাকে `public_html` ফোল্ডারে। নতুন সাইট সম্পূর্ণ আলাদা ফোল্ডারে বসবে (`designops-app`, `designops.agency`, `admin.designops.agency`)।
- পুরনো ডোমেইনের কোনো setting (DNS, SSL, .htaccess) আমরা বদলাব না।
- শুধু তিনটা নিয়ম মানবেন:
  1. `public_html` ফোল্ডারে কিছু upload করবেন না, কিছু মুছবেন না।
  2. Setup Node.js App এ **Application URL** বাছার সময় পুরনো ডোমেইন বাছবেন না, শুধু `designops.agency` বাছবেন।
  3. পুরনো ডোমেইনের Nameserver বা DNS এ হাত দেবেন না। Namecheap এ শুধু `designops.agency` বদলাবেন।

**একটাই প্রোগ্রাম দুটো ঠিকানায় চলবে:**

- `designops.agency` খুললে ওয়েবসাইট দেখাবে।
- `admin.designops.agency` খুললে ড্যাশবোর্ড দেখাবে।
- কেউ `designops.agency/admin` খুললে তাকে নিজে থেকে `admin.designops.agency` এ পাঠিয়ে দেবে।

---

## ধাপ ০: নিজের কম্পিউটারে upload এর ফাইল বানানো

VS Code এর Terminal এ project ফোল্ডারে এই command চালান:

```bash
npm run deploy
```

শেষ হলে `deploy` ফোল্ডারে দুটো ফাইল পাবেন:

| ফাইল | ভিতরে কী আছে | কখন upload করবেন |
|---|---|---|
| `deploy/designops-app.zip` | ওয়েবসাইট আর সার্ভারের প্রোগ্রাম | প্রথমবার, আর প্রতিবার সাইট update করার সময় |
| `deploy/designops-data.zip` | আপনার কম্পিউটারে এখন পর্যন্ত লেখা content (লেখা, services, work, blog…) আর upload করা ছবি | **শুধু প্রথমবার।** পরে upload করলে লাইভ সাইটের content মুছে যাবে |

আপনার কম্পিউটারের admin password, email setting, পরীক্ষার message আর visit count এই zip এ **নেই**। লাইভ সাইটে এগুলো নতুন করে শুরু হবে।

---

## ধাপ ১: হোস্টিং এ Node.js চলে কিনা দেখা

1. https://clients.arhostbd.com/clientarea.php তে login করুন।
2. **Services → My Services** এ আপনার hosting এ click করুন, তারপর **Login to cPanel** চাপুন।
3. cPanel এর উপরের search box এ লিখুন: `Node`
4. **Setup Node.js App** নামে একটা icon দেখা যায় কিনা দেখুন।

✅ icon টা দেখা গেলে ঠিক আছে, পরের ধাপে যান।
❌ না দেখা গেলে আপনার package এ Node.js নেই। arhostbd support এ ticket করে লিখুন: *"I need Node.js (Setup Node.js App) on my cPanel to run a Node.js website. Please enable it."* প্রয়োজন হলে plan upgrade করতে হতে পারে।

**এখান থেকে দুটো তথ্য টুকে রাখুন। পরের ধাপে লাগবে:**

- **Nameserver:** hosting কেনার সময় যে welcome email এসেছিল তাতে আছে। সাধারণত `ns1.কিছু.com`, `ns2.কিছু.com` এর মতো। না পেলে support কে জিজ্ঞেস করুন।
- **Server IP:** cPanel এর ডানদিকের **General Information** বক্সে **Shared IP Address** লেখা আছে।
- আপনার cPanel **username**, যেটা ফোল্ডারের ঠিকানায় দেখা যায়, যেমন `/home/username`।

---

## ধাপ ২: ডোমেইনকে হোস্টিং এর সাথে যুক্ত করা (Namecheap)

1. https://ap.www.namecheap.com/domains/domaincontrolpanel/designops.agency/domain খুলুন।
2. **NAMESERVERS** অংশে dropdown থেকে **Custom DNS** বাছুন।
3. ধাপ ১ এ টুকে রাখা দুটো nameserver বসান (যেমন `ns1....` আর `ns2....`)।
4. পাশের সবুজ ✓ চিহ্নে click করে save করুন।

⏳ সারা পৃথিবীতে এই পরিবর্তন ছড়াতে **১০ মিনিট থেকে ২৪ ঘণ্টা** লাগে, সাধারণত ১-২ ঘণ্টা। ততক্ষণ পরের ধাপগুলো করতে থাকুন।

> **অন্য উপায় (Nameserver না বদলাতে চাইলে):** Namecheap এ Nameserver "Namecheap BasicDNS" রেখে **Advanced DNS** এ তিনটা **A Record** যোগ করুন: Host `@`, `www` আর `admin`, প্রতিটার Value তে ধাপ ১ এর Server IP। দুটো উপায়ের যেকোনো একটাই করবেন, দুটো একসাথে না। নতুন হলে প্রথম উপায়টাই (Nameserver) সহজ, কারণ তখন DNS আর SSL cPanel নিজেই সামলায়।

✅ **ঠিক আছে কিনা দেখুন:** কয়েক ঘণ্টা পর https://dnschecker.org এ `designops.agency` লিখে A record দেখুন। বেশিরভাগ দেশে আপনার Server IP দেখালে হয়ে গেছে।

---

## ধাপ ৩: cPanel এ নতুন ডোমেইন যোগ করা

এতে হোস্টিং এ `designops.agency` এর জন্য একটা **আলাদা ফোল্ডার** তৈরি হবে। পুরনো সাইটে কোনো প্রভাব পড়বে না।

1. cPanel → **Domains** (পুরনো cPanel এ নাম **Addon Domains**)।
2. **Create A New Domain** চাপুন।
3. **Domain:** `designops.agency`
4. **"Share document root (/home/username/public_html) with …"** এর টিক **অবশ্যই তুলে দিন।** ⚠️ এটা সবচেয়ে জরুরি অংশ: টিক থাকলে নতুন ডোমেইনটা পুরনো সাইটের ফোল্ডার ব্যবহার করবে।
5. **Document Root:** `designops.agency` (এমনিতেই এটা বসে থাকে, রেখে দিন)। কিছু hosting এ (যেমন arhostbd) সামনে `/public_html/` আগে থেকে লেখা থাকে, ঠিকানা হয় `/public_html/designops.agency`। এটাও ঠিক আছে: এটা পুরনো সাইটের ফাইলের পাশে একটা আলাদা নতুন ফোল্ডার।
6. **Submit** চাপুন।

তারপর একই ভাবে সাবডোমেইন:

1. আবার **Create A New Domain**।
2. **Domain:** `admin.designops.agency`
3. **Share document root** এর টিক তুলে দিন।
4. **Document Root:** `admin.designops.agency`
5. **Submit**।

> পুরনো cPanel এ সাবডোমেইন বানাতে হয় আলাদা **Subdomains** icon থেকে: Subdomain ঘরে `admin`, Domain ঘরে `designops.agency`।

✅ **ঠিক আছে কিনা দেখুন:** Domains তালিকায় `designops.agency` আর `admin.designops.agency` দেখা যাচ্ছে। দুটোর document root নিজের নামের আলাদা ফোল্ডার, যেমন `/public_html/designops.agency`। শুধু `/public_html` হলে ভুল হয়েছে, কারণ সেটা পুরনো সাইটের ফোল্ডার।

---

## ধাপ ৪: SSL (https এর তালা চিহ্ন)

ধাপ ২ এর DNS ছড়িয়ে যাওয়ার পর:

1. cPanel → **SSL/TLS Status**।
2. `designops.agency`, `www.designops.agency`, `admin.designops.agency` এর পাশে টিক দিন।
3. **Run AutoSSL** চাপুন। কয়েক মিনিট লাগে।

✅ তিনটার পাশে সবুজ তালা দেখালে হয়ে গেছে। লাল দেখালে DNS এখনো ছড়ায়নি, কয়েক ঘণ্টা পর আবার চেষ্টা করুন।

---

## ধাপ ৫: ফাইল upload করা

1. cPanel → **File Manager**।
2. বাঁদিকের তালিকায় একদম উপরের ঘরের icon এ click করুন, যার নাম `/home/username`। **`public_html` এর ভিতরে যাবেন না।**
3. উপরের **+ Folder** চেপে নাম দিন `designops-app` → **Create New Folder**।
4. `designops-app` ফোল্ডারে double-click করে ঢুকুন।
5. **Upload** চাপুন, তারপর `deploy/designops-app.zip` বেছে নিন। 100% হওয়া পর্যন্ত অপেক্ষা করুন, তারপর **Go Back** চাপুন।
6. `designops-app.zip` এ right-click → **Extract** → ঘরে লেখা থাকবে `/designops-app`, ঠিক আছে → **Extract File(s)**।
7. **শুধু প্রথমবার:** একই ভাবে `deploy/designops-data.zip` upload করে একই জায়গায় Extract করুন।
8. দুটো `.zip` ফাইল মুছে দিন (right-click → Delete)।

✅ **ঠিক আছে কিনা দেখুন:** `designops-app` ফোল্ডারের ভিতরে এগুলো আছে কিনা:

```
designops-app/
  dist/
  server/        (ভিতরে index.js, data/content.json, uploads/)
  src/
  package.json
```

---

## ধাপ ৬: Node.js App তৈরি করা

1. cPanel → **Setup Node.js App** → **CREATE APPLICATION**।
2. নিচের মতো পূরণ করুন:

| ঘর | কী লিখবেন |
|---|---|
| Node.js version | তালিকার সবচেয়ে বড় সংখ্যা যেটা **20 বা তার বেশি** (যেমন 22) |
| Application mode | **Production** |
| Application root | `designops-app` |
| Application URL | dropdown থেকে **`designops.agency`**, পাশের ঘর ফাঁকা রাখুন ⚠️ পুরনো ডোমেইন না |
| Application startup file | `server/index.js` |

3. **Environment variables** অংশে **ADD VARIABLE** চেপে নিচের ৫টা একটা একটা করে যোগ করুন:

| Name | Value | কী কাজে লাগে |
|---|---|---|
| `ADMIN_EMAIL` | আপনার email, যেমন `you@gmail.com` | ড্যাশবোর্ডে login এর ID |
| `ADMIN_PASSWORD` | একটা শক্ত password (কমপক্ষে ১২ অক্ষর) | প্রথম login এর password |
| `ADMIN_NAME` | আপনার নাম | ড্যাশবোর্ডের উপরে দেখাবে |
| `SESSION_SECRET` | ৪০+ অক্ষরের এলোমেলো লেখা, যেমন কোনো password generator থেকে | login নিরাপদ রাখে, পরে আর বদলাবেন না |
| `ADMIN_HOST` | `admin.designops.agency` | ড্যাশবোর্ড সাবডোমেইনে চালায় |

4. উপরে ডানদিকে **CREATE** চাপুন।
5. পেজ নিচে scroll করুন, **Run NPM Install** চাপুন। ১-২ মিনিট লাগে, "completed successfully" লেখার জন্য অপেক্ষা করুন।
6. উপরে **RESTART** চাপুন।

✅ **ঠিক আছে কিনা দেখুন:** browser এ https://designops.agency খুলুন, আপনার ওয়েবসাইট দেখা যাওয়ার কথা।

> **নিরাপত্তা:** login এর password এখন environment variable এ লেখা আছে। প্রথম login এর পর ড্যাশবোর্ডের **Profile** থেকে password বদলে নিন। তারপর এখানকার `ADMIN_PASSWORD` বদলালেও আর কিছু হবে না।

---

## ধাপ ৭: অ্যাডমিন সাবডোমেইনকে একই App এর সাথে যুক্ত করা

ধাপ ৬ এর App টা শুধু `designops.agency` তে চলে। `admin.designops.agency` কেও একই App এ পাঠাতে হবে। নিচের **উপায় ক** চেষ্টা করুন, কাজ না করলে **খ**, তাও না হলে **গ**।

### উপায় ক (সবচেয়ে ভালো): .htaccess কপি করা

1. File Manager → উপরে ডানদিকে **Settings** → **Show Hidden Files (dotfiles)** এ টিক → **Save**।
2. `designops.agency` ফোল্ডারে ঢুকুন (arhostbd এ এটা `public_html` এর ভিতরে), `.htaccess` ফাইলে right-click → **Edit**।
3. দেখবেন এরকম একটা অংশ আছে:

   ```
   # DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN
   PassengerAppRoot "/home/username/designops-app"
   PassengerBaseURI "/"
   PassengerNodejs "/home/username/nodevenv/designops-app/22/bin/node"
   PassengerAppType node
   PassengerStartupFile server/index.js
   # DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION END
   ```

   **BEGIN** থেকে **END** পর্যন্ত পুরোটা কপি করুন। আপনার ফাইলে username আর সংখ্যা আলাদা হবে, সেটাই ঠিক। নিজে কিছু লিখবেন না, হুবহু কপি করবেন।

   **LiteSpeed server হলে (যেমন arhostbd):** এর ঠিক নিচে `# DO NOT REMOVE OR MODIFY. CLOUDLINUX ENV VARS CONFIGURATION BEGIN` থেকে `...END` পর্যন্ত আরেকটা অংশ থাকে, যাতে আপনার environment variable গুলো (`SetEnv ...`) লেখা। দুটো অংশই একসাথে কপি করুন, মানে PASSENGER BEGIN থেকে ENV VARS END পর্যন্ত। উপরের php অংশ লাগবে না।

   ⚠️ এই অংশে আপনার password আর SESSION_SECRET লেখা থাকে। কাউকে এর screenshot দেবেন না।
4. Edit window বন্ধ করুন (কিছু save করবেন না)।
5. `admin.designops.agency` ফোল্ডারে ঢুকুন (arhostbd এ এটাও `public_html` এর ভিতরে):
   - সেখানে `.htaccess` থাকলে সেটা Edit করুন।
   - না থাকলে **+ File** চেপে নাম দিন `.htaccess`, তারপর Edit করুন।
6. কপি করা অংশটা paste করে **Save Changes** চাপুন।
7. Setup Node.js App এ গিয়ে আপনার App এর পাশে **Restart** চাপুন।

✅ https://admin.designops.agency খুলুন, ড্যাশবোর্ডের login page আসার কথা।

> **পরে মনে রাখবেন:** Setup Node.js App এ কোনো environment variable বদলালে `admin.designops.agency/.htaccess` এ এই অংশটা আবার কপি করে বসাতে হবে, কারণ cPanel শুধু মূল domain এর ফাইল নিজে update করে।

### উপায় খ: একই ফোল্ডারে দ্বিতীয় App

Setup Node.js App → **CREATE APPLICATION**। ধাপ ৬ এর মতোই সব ঘর পূরণ করুন (একই Application root `designops-app`, একই ৫টা environment variable)। শুধু **Application URL** এ `admin.designops.agency` বাছুন। তারপর Run NPM Install → Restart।

এতে দুটো আলাদা প্রোগ্রাম একই ফোল্ডার থেকে চলবে। সার্ভারটা এমন ভাবে বানানো যে দুটো একসাথে চললেও কোনো সমস্যা নেই: একটায় save করা জিনিস অন্যটা সাথে সাথে দেখে, আর visit এর হিসাবও একসাথে যোগ হয়। কিছু hosting একই ফোল্ডারে দুটো App বানাতে দেয় না ("already in use" error দেখায়), তখন উপায় গ করুন।

### উপায় গ: support এর সাহায্য

arhostbd support এ ticket করে লিখুন:

> Hello, I have a Node.js app (Setup Node.js App) with application root `designops-app` running on `designops.agency`. Please make the subdomain `admin.designops.agency` serve the same Node.js application too (same app root, same process). Thank you.

---

## ধাপ ৮: প্রথম login আর জরুরি setting

1. https://admin.designops.agency → ধাপ ৬ এর `ADMIN_EMAIL` আর `ADMIN_PASSWORD` দিয়ে login করুন।
2. উপরে ডানদিকে নিজের নামে click → **Profile** → **নতুন password** দিন।
3. **ওয়েবসাইটের email account বানান** (contact form এর email পাঠানোর জন্য):
   1. cPanel → **Email Accounts** → **+ Create**।
   2. Username `info` (ঠিকানা হবে `info@designops.agency`), একটা password দিন → **Create**।
   3. ওই account এর পাশে **Connect Devices** চাপুন। সেখানে **Outgoing Server** (সাধারণত `mail.designops.agency`) আর **SMTP Port** (সাধারণত `465`) লেখা আছে।
4. ড্যাশবোর্ড → **Website Settings → Email notifications**:
   - **Send to:** যে email এ message পেতে চান।
   - **Sending account (SMTP)** খুলে লিখুন:

     | ঘর | কী লিখবেন |
     |---|---|
     | SMTP server | `mail.designops.agency` |
     | Port | `465`, SSL/TLS |
     | Username | `info@designops.agency` |
     | Password | ওই email এর password |

   - "Email me new contact form messages" চালু করুন → **Save changes** → **Send test email**।
   - Inbox আর spam folder দেখুন, test email এসেছে কিনা।
5. **Website Settings → Contact details** এ phone, email আর address ঠিক আছে কিনা দেখে নিন।

---

## ধাপ ৯: সব ঠিক আছে কিনা শেষবার দেখা

নিচের প্রতিটা একবার নিজে চেষ্টা করুন:

- [ ] https://designops.agency খোলে, তালা চিহ্ন (https) আছে।
- [ ] www.designops.agency খুললেও সাইট আসে।
- [ ] মোবাইলে সাইট ঠিক দেখায়।
- [ ] Services, Work, Blog, Company, Contact, Reviews, Privacy, Terms সব page খোলে।
- [ ] Contact form থেকে message পাঠালে ড্যাশবোর্ডের **Messages** এ আসে, আর email ও আসে।
- [ ] Reviews page থেকে review পাঠালে ড্যাশবোর্ডে "Waiting for approval" এ আসে, approve করলে সাইটে দেখায়।
- [ ] https://designops.agency/admin খুললে নিজে থেকে https://admin.designops.agency/admin এ চলে যায়।
- [ ] ড্যাশবোর্ডে কোনো লেখা বদলে save করলে ওয়েবসাইটে (refresh করে) দেখা যায়।
- [ ] কয়েকটা page ঘুরে আসার পর ড্যাশবোর্ডের **Website traffic** এ সংখ্যা দেখা যায়।
- [ ] **আপনার পুরনো ওয়েবসাইট আগের মতোই খোলে।**

---

## ধাপ ১০: Google এ সাইট তোলা

1. https://search.google.com/search-console → **Add property** → **Domain** → `designops.agency`।
2. Google যে TXT record দেবে সেটা বসান: cPanel → **Zone Editor** → `designops.agency` → **+ Add Record** → Type **TXT**। এরপর Google এ **Verify** চাপুন।
3. বাঁদিকে **Sitemaps** → ঘরে `sitemap.xml` লিখে **Submit**।

Sitemap টা সার্ভার নিজেই বানায়: নতুন service, work বা blog যোগ করলে নিজে থেকে sitemap এ যুক্ত হয়ে যায়। ড্যাশবোর্ড (`admin.`) Google এ কখনো দেখাবে না।

Google Tag Manager বা Meta Pixel ব্যবহার করলে ড্যাশবোর্ড → **Tracking & Analytics** এ ID বসান।

---

## পরে সাইট update করা (কোড বদলালে)

1. **আগে backup নিন:** File Manager → `designops-app/server` এ যান। `data` আর `uploads` select করুন → **Compress** → Zip → zip টা **Download** করুন। কিছু ভুল হলে এই backup দিয়েই সব ফেরত আনা যাবে।
2. নিজের কম্পিউটারে `npm run deploy` চালান।
3. File Manager → `designops-app` এ শুধু **`designops-app.zip`** upload করে Extract করুন। পুরনো ফাইলের উপর লেখার অনুমতি চাইলে হ্যাঁ দিন।
4. zip মুছে দিন → Setup Node.js App → **Restart**।
5. Dashboard আর ওয়েবসাইটে কয়েকটা page খুলে দেখে নিন সব ঠিক আছে কিনা।

নতুন version এ data এর গঠন বদলালে (যেমন নতুন section), server চালু হওয়ার সময় আপনার লাইভ data নিজে থেকেই নতুন গঠনে বদলে নেয় (`server/migrate.js`)। কিছু মোছে না, শুধু নতুন জায়গায় সরায়। তাই আপনার লেখা, ছবি, message আর account সব থেকে যায়।

⚠️ **`designops-data.zip` আর কখনো upload করবেন না।** করলে লাইভ সাইটের content আপনার কম্পিউটারের পুরনো content দিয়ে বদলে যাবে।

Program zip এ `server/data` আর `server/uploads` থাকে না, তাই update করলে লাইভ সাইটের content, message আর ছবি নিরাপদ থাকে।

লেখা, ছবি, service, blog বদলানোর জন্য এসব করতে হয় না। ওগুলো সবসময় ড্যাশবোর্ড থেকেই করবেন।

---

## Backup (মাসে একবার করুন)

File Manager → `designops-app/server` এ যান। `data` আর `uploads` দুটো ফোল্ডার select করে → **Compress** → Zip → তৈরি হওয়া zip টা **Download** করুন।

এতে আছে সব content, message, ড্যাশবোর্ডের account আর upload করা ছবি। cPanel এর **Backup** থেকে পুরো hosting এর backup ও নেওয়া যায়।

---

## সমস্যা হলে

| কী দেখছেন | কী করবেন |
|---|---|
| সাইট খুললে "This site can't be reached" | DNS এখনো ছড়ায়নি (ধাপ ২)। কয়েক ঘণ্টা অপেক্ষা করুন, dnschecker.org এ দেখুন। |
| "503 Service Unavailable" বা "Incomplete response" | Setup Node.js App এ **Run NPM Install** তারপর **Restart** করুন। Node.js version 20 বা বেশি কিনা দেখুন। কারণ জানতে `designops-app` ফোল্ডারে `stderr.log` খুলে দেখুন। |
| "Site not built yet" | `designops-app/dist` ফোল্ডার নেই। ধাপ ৫ আবার করুন। |
| পুরনো সাইটের লেখা বা "Index of /" দেখায় | ধাপ ৩ এ "Share document root" এর টিক ছিল, বা App ভুল ডোমেইনে বানানো। ডোমেইনের document root দেখুন। |
| নতুন সাইট খুললে পুরনো সাইটের কোনো page, "404" বা অদ্ভুত redirect আসে | নতুন ফোল্ডারটা `public_html` এর ভিতরে, তাই পুরনো সাইটের `public_html/.htaccess` এর নিয়ম এখানেও খাটতে পারে। `designops.agency/.htaccess` আর `admin.designops.agency/.htaccess` এর একদম শেষে নতুন লাইনে `RewriteEngine Off` লিখে Save করুন, তারপর App Restart করুন। পুরনো সাইটের `.htaccess` এ হাত দেবেন না। |
| admin.designops.agency খুললে খালি বা ভুল page | ধাপ ৭ ঠিক মতো হয়নি। উপায় খ বা গ চেষ্টা করুন। |
| Login হয় না | ধাপ ৬ এর `ADMIN_EMAIL`/`ADMIN_PASSWORD` দেখুন, তারপর Restart করুন। Password ভুলে গেলে `designops-app/server/data/admin.json` মুছে Restart করুন। তখন environment variable এর password দিয়ে আবার login করা যাবে। |
| Test email যায় না | Port `587` আর STARTTLS দিয়ে চেষ্টা করুন। Username পুরো email ঠিকানা কিনা দেখুন। তাও না হলে support কে জিজ্ঞেস করুন SMTP চালু আছে কিনা। |
| ড্যাশবোর্ডে বদলালাম কিন্তু সাইটে দেখায় না | Browser এ Ctrl + Shift + R চাপুন (cache মুছে refresh)। |
| বড় video upload হয় না | hosting এর upload limit থাকতে পারে। video ছোট করুন (২-৫ MB) বা support কে জিজ্ঞেস করুন। |
| পুরনো সাইটে সমস্যা | এই গাইড `public_html` বা পুরনো ডোমেইনে হাত দেয় না। ধাপ ৩ এর "Share document root" আর ধাপ ৬ এর "Application URL" আবার মিলিয়ে দেখুন। |
