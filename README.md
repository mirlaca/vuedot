# Vuedot

An example project showing the integration of a Godot 4.6 HTML export into a Vue 3.5.x SPA (to use in combination with TypeScript).

Live here: https://mirlaca.github.io/vuedot/dist/#/

## Key requirements found so far...

1. The generated engine, service worker, game package files, etc., should be loaded from the `public` folder
2. Loading and running the game within a View implies importing the main JS file from `public`. In order to limit the scope, this project includes an alias for the `public/godot`:

```typescript
// @ vite.config.ts
resolve: {
    alias: {
      '@godot': fileURLToPath(new URL('./public/godot', import.meta.url)),
      ...
```

```json
// @ tsconfig.app.json
"compilerOptions": {
  "paths": {
    "@godot/*": ["./public/godot/*"],
    ...
}
```

So that the game can be imported in the View as, e.g.,

```typescript
<script setup lang="ts">
import { Engine } from '@godot/Dodge Creeps'
...
```

3. When using TS, gotta also allow the engine's JS in the config:

```json
// @ tsconfig.app.json
"compilerOptions": {
  ...
  "allowJs": true
```

4. Furthermore, we have to add the missing `export` for `Engine` to enable it in TS:

```javascript
// @ /godot/Dodge Creeps.js:~638
export const Engine = (function () {
  ...
```

5. Last but not least, expose the `startGame` and `requestQuit` methods (in the `SafeEngine` wrapper class) to start/quit the game when the View gets mounted/unmounted:

```javascript
// @ /godot/Dodge Creeps.js:~899
SafeEngine.prototype.startGame = Engine.prototype.startGame
SafeEngine.prototype.requestQuit = Engine.prototype.requestQuit
```

## Caveats

### `requestQuit`

'Requesting to quit' shows throws expections particularly when the game has audio:

> godot can't access property `currentTime` `GodotAudio.ctx` is `null`

which breaks the game's disposal, and seems to be tied to a design issue.

Also, some other random errors such as

> ERROR: Pages in use exist at exit in PagedAllocator: N16WorkerThreadPool5GroupE

which origin I ignore, although they don't interrupt the disposal, apparently freeeing the game's memory when navigating away from it's container View (as expected):

![Memory dealocation screencap](/_img//memory_deallocation.png)
