# Âm Nhạc và Chuyển Động Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Play the supplied family-music beat on loop from the existing sound button and slow the interactive floating-heart effect.

**Architecture:** Add one project-local MP3 and use a browser `Audio` object as the only background-music source. Keep the current button and particle system, replacing only the audio toggle and three floating-heart motion constants.

**Tech Stack:** HTML, vanilla JavaScript, Three.js, HTMLAudioElement, Node.js assertions.

---

### Task 1: Define the audio and motion contract

**Files:**
- Modify: `tests/memory-album.test.mjs`
- Test: `tests/memory-album.test.mjs`

- [x] **Step 1: Add failing assertions**

```js
assert.match(html, /const backgroundMusic = new Audio\('assets\/audio\/ba-ngon-nen-lung-linh-karaoke-beat\.mp3'\);/);
assert.match(html, /backgroundMusic\.loop = true;/);
assert.match(html, /backgroundMusic\.volume = 0\.35;/);
assert.match(html, /vy: 0\.018 \+ Math\.random\(\) \* 0\.022,/);
assert.match(html, /life -= 0\.006;/);
await access(new URL('../assets/audio/ba-ngon-nen-lung-linh-karaoke-beat.mp3', import.meta.url));
```

- [x] **Step 2: Run the test to verify it fails**

Run: `node tests/memory-album.test.mjs`

Expected: an assertion failure because the page has no local `backgroundMusic` object.

### Task 2: Add the supplied audio asset

**Files:**
- Create: `assets/audio/ba-ngon-nen-lung-linh-karaoke-beat.mp3`

- [x] **Step 1: Copy the supplied MP3 into the project**

```powershell
New-Item -ItemType Directory -Force assets/audio
Copy-Item -LiteralPath 'C:\Users\admin\Downloads\Ba Ngọn Nến Lung Linh (Karaoke Beat).mp3' -Destination 'assets/audio/ba-ngon-nen-lung-linh-karaoke-beat.mp3'
```

- [x] **Step 2: Re-run the test**

Run: `node tests/memory-album.test.mjs`

Expected: it still fails on the absent JavaScript audio implementation.

### Task 3: Replace generated music and slow heart particles

**Files:**
- Modify: `v_tr_k_c_20_10.html:900-935`
- Modify: `v_tr_k_c_20_10.html:780-803`

- [x] **Step 1: Replace the Tone.js toggle with looping local audio**

```js
const backgroundMusic = new Audio('assets/audio/ba-ngon-nen-lung-linh-karaoke-beat.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;

async function toggleMusic() {
  const soundIcon = document.getElementById('sound-icon');
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      soundIcon.textContent = '🔊';
    } catch (error) {
      soundIcon.textContent = '🔇';
    }
  } else {
    backgroundMusic.pause();
    soundIcon.textContent = '🔇';
  }
}

function playChimeNote() {}
```

- [x] **Step 2: Set floating-heart properties to `vy: 0.018 + Math.random() * 0.022`, `vx` and `vz` scales of `0.012`, and `life -= 0.006`**

- [x] **Step 3: Run the test to verify it passes**

Run: `node tests/memory-album.test.mjs`

Expected: `memory album contract: passed`.

### Task 4: Verify in the browser

**Files:**
- Verify: `v_tr_k_c_20_10.html`

- [x] **Step 1: Reload the album and inspect browser console errors**

Expected: the first card renders, console errors are empty, and the card badge is `Kỷ niệm 1 / 9`.

- [x] **Step 2: Click the sound button and inspect audio state**

Expected: the icon is `🔊`, the audio is playing, `loop` is `true`, and `volume` is `0.35`.

- [x] **Step 3: Trigger hearts and inspect the first particle values**

Expected: its vertical speed is between `0.018` and `0.040`, and its remaining life decreases by `0.006` per animation frame.
