
type TTargetItem = {
  list: HTMLElement[],
  observer: IntersectionObserver
};

type TTargetList = {
  [key: string]: TTargetItem
};

export type {TTargetItem, TTargetList}
