# useDeferredValue-vs-useTransition

## Concurrency, useDeferredValue, useTransition, startTransition

## Problem

Imagine you have a list of `10000` items and you have a search input to search for items in this long list, when you start typing, you will see that overall user interface looks and feels a bit laggy, especially the input field feels unresponsive because as we're typing and especially as we're deleting characters, it `lags` behind.

And this of course is not great. So laggy input fields, which don't instantly reflect what we entered, typically are not a great user experience. And that's therefore a problem.

Now even before React 18 a good solution for this problem would probably have been to not work on `10,000` items at a time, maybe use `pagination` or any other technique, or do the filtering on the server-side instead of client-side, and these are all possible solutions you `should` take into account when encountering problems like this.

However, if you `must` perform this kind of operation on the `client side`, So in your client side code, then with `React 18` you now got some tools that can give the user a better perceived performance by `delaying` some state updating operations, by telling React that some updating operations have a higher priority than others. That's the idea behind the `Concurrency` feature introduced by React 18 and the Hooks and functions that are related to that.

## Good.js

We start with `useTransition` hook which imported from `React`. We also have the `startTransition` function, it's closely related to this Hook. But it's meant to be used places where the hook can't be used. For example class based components.

Here we can use `useTransition` hook. So we should use it.

`isPending` simply tells us if some state update with a lower priority is still pending execution, which you could use to show some indicator to the user.

How to use `startTransition` => Well, the idea is that you can wrap state updates with `startTransition` => if they should be treated with a `lower` priority. And we could do this here, in `updating input field` => so we set setFilterTerm with a lower priority.

```js
import { useTransition } from "react";

function App() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState("");

  function updateFilterHandler(event) {
    startTransition(() => {
      setFilterTerm(event.target.value);
    });
  }

  return (
    ...
    <div>{isPending && <p>Updating list...</p>}</div>
  )
}
```

With adding `startTransition` now updating input field is more smoother.

With this, we told React that updating `filterTerm` has a lower priority than other state updates.

Keep in mind that you should `not` wrap all the state updates with `startTransition`.

Only use it, if you have scenarios like this, where you have a slow laggy user interface. Especially on older devices. And where you have no other solution you could use. So, where you can't perform the work on the server or somewhere else, then this is a good solution. But otherwise, you should not start wrapping all your state updates with startTransition, because of course `startTransition` also takses up some extra performanc and is some extra work by React.

## useDeferredValue

`useDeferredValue` is also related to `Concurrency`

But useDefferedValue is used in a slightly different way.

`useDeferredValue` is useful when the value is coming from `above` and you don't actually have control over the corresponding `setState` call. If it would be for example coming from some third party library or some package that's doing that for you.
