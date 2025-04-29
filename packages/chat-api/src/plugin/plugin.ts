import { isBrowser, isNode } from "browser-or-node";
import { PluginModuleHandler } from './plugin-module';
import { PluginUIHandler } from './plugin-ui';

type PluginHandlers = {
    moduleHandler?: PluginModuleHandler;
    uiHandler?: PluginUIHandler;    
}

const PLUGIN_MANAGER_SYMBOL = Symbol.for("PLUGIN_MANAGER_SYMBOL");
function getTarget() {
    if (isBrowser) return window;
    if (isNode) return global;
}

export class PluginManager {
    public static setHandler(pluginHandler: PluginHandlers): void {
        const target = getTarget();

        if (!target) {
            throw new Error("Cannot define RegisterPlugin")
        }

        Object.defineProperty(target, PLUGIN_MANAGER_SYMBOL, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: pluginHandler
        });
    }
}

function createRegister<T extends keyof PluginHandlers>(func: T): Required<PluginHandlers>[T] {
    const register = (item: any) => {
        const target = getTarget();

        if (!target) {
            throw new Error("Cannot get global")
        }
        
        if (!(PLUGIN_MANAGER_SYMBOL in target)) {
            throw new Error("PluginHandler not defined")
        }
    
        const pluginHandlers = target[PLUGIN_MANAGER_SYMBOL] as PluginHandlers;
    
        if (pluginHandlers[func]) {
            pluginHandlers[func](item);
        }
    };

    return register as Required<PluginHandlers>[T];
}

export const RegisterUI = createRegister("uiHandler");
export const RegisterModule = createRegister("moduleHandler");
