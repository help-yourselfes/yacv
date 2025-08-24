import { SiteData } from "../../../shared/types";
import manyUrlAdapter from "./manyurl";
import { offlineAdapter } from "./offline";
import { Adapter } from "./types";

const AdapterList = new class {
    adapters: Record<string, Adapter> = {};
    sites: Record<string, SiteData> = {};
    order: string[] = [];
    addAdapter(site: SiteData, adapter: Adapter) {
        const id = site.id;
        this.order.push(id);
        this.adapters[id] = adapter;
        this.sites[id] = site;
    }
    getList() {
        return this.order.map(id => this.sites[id])
    }

    has(id: string) {
        return this.adapters[id] !== undefined
    }

    get(id: string) {
        return this.adapters[id];
    }

    init() {
        this.addAdapter({
            description: `An offline adapter with setTimeout
                in returnable promises`,
            id: 'offline',
            name: 'Offline adapter',
            url: 'none',
            pictureUrl: 'offline.png',
        }, offlineAdapter);
        this.addAdapter({
            description: 'Some site with abc.def url',
            id: 'abc',
            name: 'ABC def',
            url: 'abc.def',
            pictureUrl: 'offline.png'
        }, manyUrlAdapter('abc.def'))
        this.addAdapter({
            description: `Another one site with the same
            adapter as ABCdef one`,
            id: 'another',
            name: 'Another Url',
            url: 'another.url',
            pictureUrl: 'offline.png',
        }, manyUrlAdapter('another.url'))
    }
}

export default AdapterList;