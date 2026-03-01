const Reporting = require('./pcec-reporting');
const fs = require('fs');
const path = require('path');

// 存储报告的文件路径
const REPORTS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_reports.json');
const REPORT_HISTORY_FILE = path.join(__dirname, '.trae', 'data', 'pcec_report_history.json');

// 测试函数
async function runTests() {
    console.log('Starting Reporting tests...');

    // 清理测试环境
    const filesToClean = [REPORTS_FILE, REPORT_HISTORY_FILE];
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Cleaned up ${path.basename(file)}`);
        }
    });

    // 测试1: 生成报告
    console.log('\n=== Test 1: Generate Report ===');
    const reporting = new Reporting();
    
    // 模拟进化结果
    const evolutionResults = [
        {
            cycle: 1,
            timestamp: Date.now() - 3600000,
            direction: { type: 'new_feature', description: 'Enhanced File Operations' },
            result: { success: true },
            isSignificant: true,
            explosionType: 'scalabilityPerspective'
        },
        {
            cycle: 2,
            timestamp: Date.now() - 1800000,
            direction: { type: 'new_abstraction', description: 'File Operation Patterns' },
            result: { success: true },
            isSignificant: true
        },
        {
            cycle: 3,
            timestamp: Date.now(),
            direction: { type: 'new_lever', description: 'Batch File Operations' },
            result: { success: true },
            isSignificant: false
        }
    ];
    
    const report = reporting.generateReport(evolutionResults);
    console.log(`Generated report: ${report.id}`);
    console.log(`Report recipient: ${report.recipient}`);
    console.log(`Report summary:`, report.summary);

    // 测试2: 发送报告
    console.log('\n=== Test 2: Send Report ===');
    const sendResult = reporting.sendReport(report.id);
    console.log(`Send result: ${sendResult.success ? 'SUCCESS' : 'FAILED'}`);

    // 测试3: 获取报告
    console.log('\n=== Test 3: Get Report ===');
    const retrievedReport = reporting.getReport(report.id);
    if (retrievedReport) {
        console.log(`Retrieved report: ${retrievedReport.id}`);
        console.log(`Report recipient: ${retrievedReport.recipient}`);
    } else {
        console.error('Report not found');
    }

    // 测试4: 验证报告安全性
    console.log('\n=== Test 4: Verify Report Security ===');
    const securityResult = reporting.verifyReportSecurity(report);
    console.log(`Security verification: ${securityResult ? 'PASSED' : 'FAILED'}`);

    // 测试5: 获取所有报告和报告历史
    console.log('\n=== Test 5: Get All Reports and History ===');
    const allReports = reporting.getAllReports();
    const reportHistory = reporting.getReportHistory();
    console.log(`Total reports: ${allReports.length}`);
    console.log(`Total report history entries: ${reportHistory.length}`);

    // 测试6: 清理旧报告
    console.log('\n=== Test 6: Cleanup Old Reports ===');
    reporting.cleanupOldReports(30);
    const reportsAfterCleanup = reporting.getAllReports();
    console.log(`Reports after cleanup: ${reportsAfterCleanup.length}`);

    // 清理测试环境
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });

    console.log('\nAll tests completed!');
}

// 运行测试
runTests().catch(console.error);