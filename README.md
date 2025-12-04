## 네이티브의 화면전환과 웹의 화면 전환

네이티브 앱에서는 화면을 스택 구조로 쌓아가며 관리하며,

새로운 화면이 슬라이드되며 등장하거나 기존 화면이 슬라이드되며 사라지는 등의 전환 효과를 보여줍니다.

특히 화면이 사라질 때는 사라지는 화면 뒤로 이전 화면이 남아있습니다.

하지만 웹에서는 일반적으로 화면이 새로 로드되며 이전 화면은 사라집니다.

이렇게 웹의 화면 전환은 네이티브 앱과 같지 않지만,

많은 하이브리드 앱 프로젝트에서는 웹뷰가 네이티브 앱처럼 동작하기를 원합니다.

## 왜 만들었나요?

새로운 하이브리드 앱 프로젝트를 진행하게 되었습니다.

네이티브 앱처럼 화면이 전환되게 해달라는 요구사항은 없었지만,

필요성을 느껴 직접 제안하게 되었습니다.

물론 이미 스택 구조로 뷰를 관리하도록 개발된 프로젝트가 있긴 했습니다.

하지만 Vue2로 개발되어 있기도 하고, 프로젝트에 종속되거나 불필요한 코드가 많아 새롭게 개발하기로 결정했습니다.

## 아이디어

- 뷰를 네이티브 앱처럼 스택 구조로 관리한다.

- 네비게이션 함수는 vue router의 기본적인 네비게이션(`push`, `go`, `replace`)을 그대로 사용한다.
  ( 화면 전환 효과를 위해서 새로운 네비게이션 함수를 익혀야 한다는 피로도를 주고 싶지 않았습니다 )

- 스택의 길이를 조회하지 않고도 특정 index의 화면으로 돌아갈 수 있는 함수를 제공한다.

## 어떻게 동작하나요?

Vue Router의 `push`, `go`, `replace` 함수를 사용하여 라우트를 변경한다.

```javascript
router.push({ name: "pageA", params: { component: "pageAA" } });

router.go(-1);

router.replace({ name: "pageB", params: { component: "pageBB" } });
```

Vue Router의 `afterEach`를 통해 라우트 변경을 감지한다.

브라우저 히스토리의 `position`을 추적해서 앞으로/뒤로 이동을 판단한다.

```javascript
let historyPosition = window.history.state?.position;
router.afterEach((to, from) => {
  // ...
  const currentHistoryPosition = window.history.state?.position;
  const currentComponent = to.params.component;

  if (currentHistoryPosition > historyPosition && currentComponent) {
    store.push({
      name: currentComponent,
    });
  }
});
```

스택에 페이지를 추가하거나 제거한다.

```javascript
export const usePageStackStore = defineStore("pageStack", () => {
  // ...
  const stack = ref<Page[]>([]);

  const push = (page: Page) => {
    stack.value.push(page);
  };
});
```

`BaseStacks` 컴포넌트가 스택에 쌓인 페이지들을 Transition과 함께 렌더링한다.

```html
<TransitionGroup tag="div" class="relative" appear>
  <component
    v-for="page in store.stack"
    :key="page.name"
    :is="components[page.name]"
    class="absolute top-0 left-0 w-screen h-screen"
  />
</TransitionGroup>
```

## 프로젝트 구조

```
src/
├── components/
│   └── BaseStacks.vue      # 스택 렌더링 컴포넌트
├── pages/                   # 페이지 컴포넌트들
├── router/
│   └── index.ts            # Vue Router 설정
├── stores/
│   └── pageStack.ts        # PageStack 스토어
├── App.vue                  # 루트 컴포넌트
└── main.ts
```

## 사용 기술

- **Vue 3**
- **Vue Router 4**
- **Pinia**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
