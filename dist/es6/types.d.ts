declare type TTargetItem = {
    list: HTMLElement[];
    observer: IntersectionObserver;
};
declare type TTargetList = {
    [key: string]: TTargetItem;
};
export type { TTargetItem, TTargetList };
