import { offlineAdapter } from "./offline";
import { Adapter } from "./types";

const AdapterList = new class {
    list: Record<string, Adapter> = {};
    order: string[] = [];
    addAdapter(adapter: Adapter) {
        const id = adapter.site.id;
        this.order.push(id);
        this.list[id] = adapter;
    }
    getList() {
        return this.order.map(id => this.list[id].site)
    }

    has(id:string) {
        return this.list[id] !== undefined
    }

    get(id:string) {
        return this.list[id];
    }

    init() {
        this.addAdapter(offlineAdapter);
    }
}

export default AdapterList;