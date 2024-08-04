import pluginArr from '../services/plugins/pluginsConfig.json' assert {'type':"json"};

export default function runPlugins(symbol,data,instances) {
    pluginArr.map(params => {
        let [pluginName,pluginValue] = Object.entries(params)[0];
        let instance = instances.find(ins => ins.name == pluginName).instance
        instance.execute(symbol,data,pluginValue)
    })
}