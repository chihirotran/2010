import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
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
assert.equal((html.match(/imageUrl: "assets\/memories\//g) ?? []).length, 9);
assert.match(html, /Kỷ niệm 1 \/ 9/);
assert.doesNotMatch(html, /Đám cưới 2016|Đám cưới 2018|Cháu Hến/);
assert.match(html, /const backgroundMusic = new Audio\('assets\/audio\/ba-ngon-nen-lung-linh-karaoke-beat\.mp3'\);/);
assert.match(html, /backgroundMusic\.loop = true;/);
assert.match(html, /backgroundMusic\.volume = 0\.35;/);
assert.match(html, /vy: 0\.018 \+ Math\.random\(\) \* 0\.022,/);
assert.match(html, /life -= 0\.006;/);
assert.match(html, /id="wish-card"[\s\S]*id="interaction-hint" class="hidden sm:block short:hidden mt-2 text-xs sm:text-sm text-amber-200\/90 text-center"/);
assert.match(html, /id="wish-card" class="[^"]*max-h-\[34vh\] sm:max-h-none/);
for (const label of ['Tự động lướt', 'Tự do chạm xoay', 'Thay ảnh & Lời chúc']) {
  assert.match(html, new RegExp(`<span class="hidden sm:inline short:hidden">${label}</span>`));
}
await access(new URL('../assets/audio/ba-ngon-nen-lung-linh-karaoke-beat.mp3', import.meta.url));
for (let index = 1; index <= 9; index += 1) {
  await access(new URL(`../assets/memories/${String(index).padStart(2, '0')}.jpg`, import.meta.url));
}

console.log('memory album contract: passed');
