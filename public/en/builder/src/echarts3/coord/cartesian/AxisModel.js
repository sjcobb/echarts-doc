import * as zrUtil from 'zrender/src/core/util';
import ComponentModel from '../../model/Component';
import axisModelCreator from '../axisModelCreator';
import axisModelCommonMixin from '../axisModelCommonMixin';
var AxisModel = ComponentModel.extend({
  type: 'cartesian2dAxis',

  /**
   * @type {module:echarts/coord/cartesian/Axis2D}
   */
  axis: null,

  /**
   * @override
   */
  init: function () {
    AxisModel.superApply(this, 'init', arguments);
    this.resetRange();
  },

  /**
   * @override
   */
  mergeOption: function () {
    AxisModel.superApply(this, 'mergeOption', arguments);
    this.resetRange();
  },

  /**
   * @override
   */
  restoreData: function () {
    AxisModel.superApply(this, 'restoreData', arguments);
    this.resetRange();
  },

  /**
   * @override
   * @return {module:echarts/model/Component}
   */
  getCoordSysModel: function () {
    return this.ecModel.queryComponents({
      mainType: 'grid',
      index: this.option.gridIndex,
      id: this.option.gridId
    })[0];
  }
});

function getAxisType(axisDim, option) {
  // Default axis with data is category axis
  return option.type || (option.data ? 'category' : 'value');
}

zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);
var extraOption = {
  // gridIndex: 0,
  // gridId: '',
  // Offset is for multiple axis on the same position
  offset: 0
};
axisModelCreator('x', AxisModel, getAxisType, extraOption);
axisModelCreator('y', AxisModel, getAxisType, extraOption);
export default AxisModel;