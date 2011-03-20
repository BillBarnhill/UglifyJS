module.exports = {
  /**
   * This is comment 1, for a function in public API
   */
 openStore : function(options, callback) {
    var store = new MemStore();
    callback(false, store);
  }
};

/**
 * This is comment 2, for a top level function
 * -----
 * * thing 1
 * * thing 2
 */
function MemStore() {
  if(false === (this instanceof MemStore)) {
    return new MemStore();
  }
  this.data = {};
}

MemStore.prototype = {
 /**
  * This also is comment 3, for a function in a prototype
  */
 setValue : function(key, vals, callback) {
    // Result: {'key': k, 'values': values, 'old': old value}
    var prev = this.data[key] || undefined;
    var next = [].concat(vals);
    this.data[key] = next;
    var result = {'key': key, 'values': next, 'old': prev};
    callback(false, result);
  },

 addValues : function(key, vals, callback) {
    // Result: {'key': k, 'values': values}
    var prev = this.data[key] || undefined;
    var next = (prev || []).concat(vals);
    this.data[key] = next;
    var result = {'key': key, 'values': next, 'old': prev};
    callback(false, result);
  },

 getValue : function(key, callback) {
    // Result: {'key': k, 'value': value}
    // TODO fix this so one value == one callback call
    var val = this.data[key] || undefined;
    var result = {'key':key, 'value': val};
    callback(false, result);
  },

 getValues : function(key, callback) {
    // Result: {'key': k, 'values': values}
    var val = this.data[key] || undefined;
    var result = {'key':key, 'values': val};
    callback(false, result);
  },

 iterateFeatures : function(callback) {
    // Result: {'feature': name, 'exists': T or F}
    // We only have 1 feature, so cb only called once
    callback(false, {'feature': 'commands', 'exists': true});
  },
 
 feature : function(featureName) {
    // Result: object with feature specific properties and/or methods
    var CommandsFeature = require('./feature-commands.js');
    var store = this;
    return new CommandsFeature(store);
  }
};


