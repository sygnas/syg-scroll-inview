
type TTargetItem = {
  list: HTMLElement[],
  observer: IntersectionObserver
};

type TTargetList = {
  [key: string]: TTargetItem
};

type TOnInviewFunc = (elm:IntersectionObserverEntry['target']) => void;

export type {TTargetItem, TTargetList, TOnInviewFunc}
