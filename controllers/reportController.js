const reportService = require('../services/reportService');

const getLowStockReport = async (req, res) => {
  try {
    const threshold = Number(req.query.threshold) || 10;

    const report = await reportService.getLowStockReport(threshold);

    return res.status(200).json({
      success: true,
      message: 'Low stock report fetched successfully',
      data: report
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch low stock report',
      error: error.message
    });
  }
};

const getInventorySummaryReport = async (req, res) => {
  try {
    const report = await reportService.getInventorySummaryReport();

    return res.status(200).json({
      success: true,
      message: 'Inventory summary report fetched successfully',
      data: report
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory summary report',
      error: error.message
    });
  }
};

const getOrderSummaryReport = async (req, res) => {
  try {
    const report = await reportService.getOrderSummaryReport();

    return res.status(200).json({
      success: true,
      message: 'Order summary report fetched successfully',
      data: report
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order summary report',
      error: error.message
    });
  }
};

const getSalesSummaryReport = async (req, res) => {
  try {
    const report = await reportService.getSalesSummaryReport();

    return res.status(200).json({
      success: true,
      message: 'Sales summary report fetched successfully',
      data: report
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch sales summary report',
      error: error.message
    });
  }
};

module.exports = {
  getLowStockReport,
  getInventorySummaryReport,
  getOrderSummaryReport,
  getSalesSummaryReport
};