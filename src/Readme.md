# Svelte

## Svelte

To run in watch mode (TS + SCSS):
> node run svelte-run

To build:
> node run svelte-build

### Svelte | linting

The setup is using ESLIT with [eslint-plugin-svelte](https://ota-meshi.github.io/eslint-plugin-svelte/user-guide/) that enhance the ufficial svelte3 plugin.

NB. To have ESLint VS Code integration, you need the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

NB. Svelte type-aware ESLint has some limitations, as stated in the [official docs](https://github.com/sveltejs/eslint-plugin-svelte3#installation-with-typescript):

```text
There are some limitations to these type-aware rules currently. Specifically, checks in the context of reactive assignments and store subscriptions will report false positives or false negatives, depending on the rule. In the case of reactive assignments, you can work around this by explicitly typing the reactive variable. An example with the no-unsafe-member-access rule...
```

### Svelte | Unit testing

The unit-tests setup follows this resources:

- [How do I test Svelte apps?](https://svelte.dev/faq#how-do-i-test-svelte-apps)
- [testing-library.com | svelte-testing-library | setup | JEST](https://testing-library.com/docs/svelte-testing-library/setup)
- [svelte-jester | typescript](https://github.com/svelteness/svelte-jester#typescript)
- [Configuring Jest](https://jestjs.io/docs/configuration)

You can see how to test a Svelte component here (as in our \_\_tests\_\_ folder):

- [Example of Svelte Component unit test](https://testing-library.com/docs/svelte-testing-library/example)

The setup uses `JEST` because `Vite` was not working, maybe after we remove `AngularJs` and the need of custom `tsconfig.json` files it can be easier.
Jest uses the `/App` folder as root folder, as specified in the node script.
Install the `VS Code` `Jest runner` to get `IDE integration`.

### Svelte | VS Code extensions

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Svelte Intellisense](https://marketplace.visualstudio.com/items?itemName=ardenivanov.svelte-intellisense)
- [Jest | vscode-jest (VS Code test runner)](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

Other useful extensions:

- [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)

NB. `.vscode/settings.json` is used to guarantee consistency between devs.

- [Chrome Svelte Devtools](https://chrome.google.com/webstore/detail/svelte-devtools/ckolcbmkjpjmangdbmnkpjigpkddpogn). OBS. As today it could break some Svelte components (like `uibtooltips.ts`). See: [#5290](https://github.com/sveltejs/svelte/issues/5290).

### Svelte | build & watch pipeline

Svelte output directory is `wwwroot/build/`

- `svelte-scss-build` | `svelte-scss-watch`: build & watch scss files. Output is `wwwroot/build/style.css`.
- `svelte-build-vendor`: builds the same vendor packages used in the AngularJS app (SignalR, etc), needed also by Svelte, but exclude AngularJS-specific packages. Output is `wwwroot/build/vendor.js`.
- `svelte-build-all` | `svelte-watch-all`: build & watch TS/Svelte files. Output is `wwwroot/build/[viewname].[css|js|js.map]`.
- `svelte-run`: watch scss/TS/Svelte files.
- `svelte-build`: build scss/TS/Svelte files.

- `svelte-test`: run unit tests.
- `svelte-test:watch`: run & watch unit tests. Not needed if you have vscode-jest installed.

## Svelte | Best practices

- The Svelte setup used here is based on this example-repo: <https://github.com/vb-consulting/RazorSvelte>.
  - I just simpified and removed stuff we didn't need.
  - For our SPA-routing scenario, the [spa-example.svelte](https://github.com/vb-consulting/RazorSvelte/blob/master/RazorSvelte/App/spa-example.svelte) and related folder (`spa-views`) are the important parts.

- We use a custom router (due to SPA routing) [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router).

- How to deal with Svelte stores: <https://github.com/sveltejs/svelte/issues/4285>

- Strongly-typed Events/Props/Slots are still work-in-progress, see [442](https://github.com/sveltejs/language-tools/issues/442).

- Context API & Store, see [repl](https://svelte.dev/repl/7df82f6174b8408285a1ea0735cf2ff0?version=3.24.0).

- To export a type/interface from a Svelte component, see this [SO](https://stackoverflow.com/a/64066160).

- Events forwarding can be tricky in Svelte as events does not bubble. ip. You could use a Context.

- VS Code does not support custom `tsconfig.ts` files, so you will get VS Code errors in some svelte components, due to attributs set to have retro-compatibility with Bootstrap + AngularJS + LESS. When AngularJS will be removed, we can rename `tsconfig.svelte.ts` to `tsconfig.ts`. For more details see below.

## Svelte | VS Code HTML attribute augmentation

It is possible to configure VS Code to understand custom attributes (augmentation).

As today, you will get VS Code errors in some sSvelte components, due to attributs set to have retro-compatibility with Bootstrap 3.x + AngularJS + LESS.

When AngularJS (`tsconfig.gulp.ts`) will be removed, we can rename `tsconfig.svelte.ts` to `tsconfig.ts` and get advantage of the VS Code augmentation you can find/maintain in [additional-svelte-typings.d.ts](App\types\additional-svelte-typings.d.ts).

For more info:

- Augmentation file is based on: <https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error>
- It works if there is a standard `tsconfig.ts` file in the root, but we need to have two `tsconfig.json`:
  - 1 x `AngularJS`/Gulp, and
  - 1 x `Svelte` (otherwise they conflict).
- This means that when we have removed AngularJs and his typescript config, we can rename `tsconfig.svelte.ts` to `tsconfig.ts` and it will just work.
- See this open issue: <https://github.com/sveltejs/language-tools/issues/1869>
