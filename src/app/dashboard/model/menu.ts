export class Menu {

    public get menuId(): number {
        return this.menuId;
    }

    public set menuId(menuId: number) {
        this.menuId = menuId;
    }

    public get menuName(): string {
        return this.menuName;
    }

    public set menuName(menuName: string) {
        this.menuName = menuName;
    }

    public get active(): boolean {
        return this.active;
    }

    public set active(active: boolean) {
        this.active = active;
    }

}
