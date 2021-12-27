declare type TTargetItem = {
    list: HTMLElement[];
    observer: IntersectionObserver;
};
declare type TTargetList = {
    [key: string]: TTargetItem;
};
declare type TOnInviewFunc = (elm: IntersectionObserverEntry['target']) => void;
export type { TTargetItem, TTargetList, TOnInviewFunc };
