# Album Ký Ức 20/10 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace remote placeholder memories with the nine approved family photos and titles, rendered by the existing 3D gallery.

**Architecture:** Keep the existing single-file application and its `DEFAULT_MEMORIES` data model. Store each source photo under a project-local `assets/memories/` directory and make the memory data reference those relative paths; existing dynamic `TOTAL_FRAMES = memories.length` then drives the 3D gallery, badge and drawer.

**Tech Stack:** HTML, vanilla JavaScript, Three.js, Node.js assertions.

---

## File structure

- `assets/memories/`: nine supplied JPEGs, renamed by display order.
- `v_tr_k_c_20_10.html`: the memory metadata and initial visible count.
- `tests/memory-album.test.mjs`: extracts memory metadata from the HTML and verifies the nine-file, nine-title album contract.

### Task 1: Define the album contract with a failing test

**Files:**
- Create: `tests/memory-album.test.mjs`
- Test: `tests/memory-album.test.mjs`

- [x] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const html = await readFile(new URL('../v_tr_k_c_20_10.html', import.meta.url), 'utf8');
const expectedTitles = [
  'Mùa Hè Rực Rỡ Của Cả Nhà',
  'Ba Thế Hệ, Một Tình Thân',
  'Mẹ Và Mùa Hoa Nở',
  'Mẹ Trên Con Đường Xanh',
  'Bình Yên Trong Gió',
  'Nụ Cười Giữa Vườn Nhà',
  'Nét Xuân Của Chị',
  'Một Góc Bình Yên Của Chị',
  'Hành Trình Của Những Yêu Thương'
];

for (const title of expectedTitles) assert.match(html, new RegExp(`title: "${title}"`));
assert.equal((html.match(/imageUrl: "assets\\/memories\\//g) ?? []).length, 9);
assert.match(html, /Kỷ niệm 1 \/ 9/);
for (let index = 1; index <= 9; index += 1) await access(new URL(`../assets/memories/${String(index).padStart(2, '0')}.jpg`, import.meta.url));
console.log('memory album contract: passed');
```

- [x] **Step 2: Run the test to verify it fails**

Run: `node tests/memory-album.test.mjs`

Expected: an assertion failure because the HTML currently contains only six Unsplash URLs and no `assets/memories/` files.

### Task 2: Add the local photo assets

**Files:**
- Create: `assets/memories/01.jpg` through `assets/memories/09.jpg`

- [x] **Step 1: Copy supplied source photos in narrative order**

```powershell
New-Item -ItemType Directory -Force assets/memories
Copy-Item 'C:\Users\admin\Pictures\2010\Me-va-chi\485130056_2411867169151581_7166258363432464045_n.jpg' assets/memories/01.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Me-va-chi\483892696_2407887376216227_7044238195632125337_n.jpg' assets/memories/02.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Me\487379062_2428125000859131_1736839931641054374_n.jpg' assets/memories/03.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Me\484553843_2414771178861180_7012975816290519813_n.jpg' assets/memories/04.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Me\484076261_2414771122194519_2676456847370062939_n.jpg' assets/memories/05.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Me\482068829_2403042763367355_4628087926896533393_n.jpg' assets/memories/06.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Chi\634751173_25358211200524254_3484416768684205989_n.jpg' assets/memories/07.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Chi\625352580_25245788158433226_5591286470341769160_n.jpg' assets/memories/08.jpg
Copy-Item 'C:\Users\admin\Pictures\2010\Chi\499860493_2633400313665740_4764467931898195693_n.jpg' assets/memories/09.jpg
```

- [x] **Step 2: Re-run the test**

Run: `node tests/memory-album.test.mjs`

Expected: it still fails because the HTML metadata has not yet been updated.

### Task 3: Replace placeholder memory metadata

**Files:**
- Modify: `v_tr_k_c_20_10.html:251-313`
- Modify: `v_tr_k_c_20_10.html:183`

- [x] **Step 1: Replace all six existing objects with nine approved memories**

Replace the array with nine objects using these exact title, subtitle, image and wish values. Keep the existing `themeColor`, `accentColor` and `icon` values in their current sequence; reuse the final palette and icon for items 7–9.

```js
[
  ['Mùa Hè Rực Rỡ Của Cả Nhà', 'Chuyến đi biển đầy nắng', 'assets/memories/01.jpg', 'Một chuyến đi biển, một bầu trời trong xanh và thật nhiều tiếng cười. Chúc Mẹ và Chị luôn có những ngày tháng thảnh thơi, rạng rỡ bên gia đình mình!'],
  ['Ba Thế Hệ, Một Tình Thân', 'Yêu thương bên bờ biển', 'assets/memories/02.jpg', 'Giữa biển trời rộng lớn, tình thân của gia đình mình vẫn luôn gần gũi và ấm áp. Chúc Mẹ, Chị và cả nhà mãi sum vầy trong niềm vui!'],
  ['Mẹ Và Mùa Hoa Nở', 'Khoảnh khắc dịu dàng của Mẹ', 'assets/memories/03.jpg', 'Mẹ rạng rỡ giữa những đóa hoa đang nở, như chính tình yêu Mẹ luôn vun đầy cho gia đình. Con chúc Mẹ luôn khỏe mạnh và nhiều niềm vui!'],
  ['Mẹ Trên Con Đường Xanh', 'Mỗi hành trình đều thật tươi', 'assets/memories/04.jpg', 'Mong Mẹ luôn giữ được năng lượng, sự tự tin và niềm vui trên mọi con đường. Với chúng con, Mẹ lúc nào cũng thật tuyệt vời!'],
  ['Bình Yên Trong Gió', 'Một chiều thật nhẹ nhàng', 'assets/memories/05.jpg', 'Giữa cỏ cây và gió trời, nụ cười của Mẹ làm mọi thứ trở nên bình yên hơn. Chúc Mẹ mỗi ngày đều an nhiên và hạnh phúc!'],
  ['Nụ Cười Giữa Vườn Nhà', 'Khu vườn đầy sắc hoa', 'assets/memories/06.jpg', 'Mẹ và khu vườn hoa rực rỡ là một bức tranh thật đẹp. Con chúc Mẹ mãi giữ nụ cười tươi và một trái tim đầy yêu thương!'],
  ['Nét Xuân Của Chị', 'Áo dài và nụ cười đầu năm', 'assets/memories/07.jpg', 'Chị trong tà áo dài hồng mang theo cả không khí mùa xuân. Chúc Chị luôn xinh đẹp, vui tươi và gặp thật nhiều điều may mắn!'],
  ['Một Góc Bình Yên Của Chị', 'Nụ cười trong nắng sớm', 'assets/memories/08.jpg', 'Một góc sân xanh, một nụ cười ấm áp — bình yên đôi khi giản dị như thế. Chúc Chị luôn có thật nhiều ngày vui bên những người mình thương!'],
  ['Hành Trình Của Những Yêu Thương', 'Cả nhà cùng khám phá', 'assets/memories/09.jpg', 'Mỗi chuyến đi cùng nhau đều trở thành một kỷ niệm đáng quý. Chúc gia đình mình luôn có thêm nhiều hành trình rực rỡ và tiếng cười!']
]
```

- [x] **Step 2: Change the initial static badge from `Kỷ niệm 1 / 6` to `Kỷ niệm 1 / 9`**

The live value remains dynamically overwritten by `updateWishCardUI()`.

- [x] **Step 3: Run the test to verify it passes**

Run: `node tests/memory-album.test.mjs`

Expected: `memory album contract: passed`.

### Task 4: Verify the delivered page

**Files:**
- Verify: `v_tr_k_c_20_10.html`
- Verify: `assets/memories/01.jpg` through `assets/memories/09.jpg`

- [x] **Step 1: Parse the HTML and execute the metadata test**

Run: `node tests/memory-album.test.mjs`

Expected: exit code 0 and `memory album contract: passed`.

- [x] **Step 2: Confirm the local asset inventory**

Run: `Get-ChildItem assets/memories -File | Measure-Object | Select-Object -ExpandProperty Count`

Expected: `9`.

- [x] **Step 3: Manually inspect the opened page**

Open `v_tr_k_c_20_10.html`, wait through the intro, and confirm the badge, all nine 3D frames, next/previous looping, and nine drawer entries use the approved titles and images.
