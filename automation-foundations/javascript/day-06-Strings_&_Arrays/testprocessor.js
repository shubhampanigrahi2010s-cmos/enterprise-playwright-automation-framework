// Professional Test Data Processor 

// ES6 Class definition for processing test automation data
// Classes provide a cleaner way to create objects with methods
class TestDataProcessor { 
    // Constructor runs when new instance is created: new TestDataProcessor()
    constructor() { 
        // Initialize results array to store test data
        // 'this' refers to the current instance of the class
        this.results = []; 
        
        // Initialize metrics as null - will hold analysis results later
        this.metrics = null; 
    } 
    
    // ========================================== 
    // DATA IMPORT 
    // ========================================== 
    
    // Method to import CSV format data and convert to objects
    // Parameter: csvString - multiline CSV text
    importCSV(csvString) { 
        // Display import start message with emoji
        console.log('📥 Importing CSV data...'); 
        
        // .trim() removes leading/trailing whitespace
        // .split('\n') breaks string into array of lines
        const lines = csvString.trim().split('\n'); 
        
        // First line contains headers (column names)
        // .split(',') breaks header line into array
        // .map(h => h.trim()) removes whitespace from each header
        const headers = lines[0].split(',').map(h => h.trim()); 
        
        // Process data rows (skip header with .slice(1))
        // .map transforms each line into an object
        this.results = lines.slice(1).map(line => { 
            // Split current line by comma to get values
            const values = line.split(','); 
            
            // reduce() builds object from headers and values
            // obj is accumulator (empty object {}), header is current header
            // index tracks position to get corresponding value
            return headers.reduce((obj, header, index) => { 
                // Set property on object using header as key
                // values[index] gets value at same position as header
                // ?. optional chaining handles undefined values
                // normalizeValue converts string values to proper types
                obj[header] = this.normalizeValue(values[index]?.trim()); 
                
                // Return object for next iteration
                return obj; 
            }, {}); // Start with empty object
        }); 
        
        // Display success message with count
        console.log(`✅ Imported ${this.results.length} records`); 
        
        // Return 'this' to enable method chaining
        // Allows: processor.importCSV().validate().analyze()
        return this; 
    } 
    
    // Method to import JSON format data
    // Parameter: jsonString - JSON text
    importJSON(jsonString) { 
        // Display import start message
        console.log('📥 Importing JSON data...'); 
        
        // try-catch handles potential JSON parsing errors
        try { 
            // JSON.parse converts JSON string to JavaScript object/array
            const data = JSON.parse(jsonString); 
            
            // Check if parsed data is array
            // If array, use as-is; if object, wrap in array
            // Ternary operator: condition ? valueIfTrue : valueIfFalse
            this.results = Array.isArray(data) ? data : [data]; 
            
            // Display success message
            console.log(`✅ Imported ${this.results.length} records`); 
        } catch (error) { 
            // If parsing fails, display error message
            // error.message contains description of what went wrong
            console.error(`❌ Invalid JSON: ${error.message}`); 
        } 
        
        // Return this for method chaining
        return this; 
    } 
    
    // Helper method to convert string values to appropriate types
    // Parameter: value - string value from CSV
    normalizeValue(value) { 
        // Check if value is string 'true', convert to boolean true
        if (value === 'true') return true; 
        
        // Check if value is string 'false', convert to boolean false
        if (value === 'false') return false; 
        
        // Check if value is numeric
        // !isNaN(value) - not Not-a-Number (so IS a number)
        // value !== '' - not empty string
        // parseFloat converts string to number
        if (!isNaN(value) && value !== '') return parseFloat(value); 
        
        // Check if value is string 'null', convert to null
        if (value === 'null') return null; 
        
        // Otherwise return value as-is (string)
        return value; 
    } 
    
    // ========================================== 
    // DATA VALIDATION 
    // ========================================== 
    
    // Method to validate imported data for required fields and formats
    validate() { 
        // Display validation start message
        console.log('\n🔍 Validating data...'); 
        
        // Check each result and collect validation errors
        // .map transforms each result into validation report
        const issues = this.results.map((result, index) => { 
            // Array to store error messages for this result
            const errors = []; 
            
            // Check if ID field exists
            // !result.id is true if id is missing, undefined, null, or empty
            if (!result.id) errors.push('Missing ID'); 
            
            // Check if name field exists
            if (!result.name) errors.push('Missing name'); 
            
            // Check if duration is valid number and not negative
            // typeof checks data type
            // || means OR - either condition makes if true
            if (typeof result.duration !== 'number' || result.duration < 0) { 
                errors.push('Invalid duration'); 
            } 
            
            // Check if status is one of allowed values
            // .includes() checks if array contains value
            if (!['passed', 'failed', 'skipped'].includes(result.status)) { 
                errors.push('Invalid status'); 
            } 
            
            // Return validation report for this result
            return { index, errors }; 
        }).filter(item => item.errors.length > 0); 
        // .filter keeps only items with errors (length > 0)
        
        // Check if any validation issues were found
        if (issues.length > 0) { 
            // Display warning about invalid records
            console.warn(`⚠️  Found ${issues.length} invalid records`); 
            
            // Loop through issues and display details
            issues.forEach(issue => { 
                // index + 1 because users expect 1-based counting (not 0-based)
                // .join(', ') combines error array into comma-separated string
                console.log(`  Row ${issue.index + 1}: ${issue.errors.join(', ')}`); 
            }); 
        } else { 
            // If no issues, display success message
            console.log('✅ All data is valid'); 
        } 
        
        // Return this for method chaining
        return this; 
    } 
    
    // ========================================== 
    // DATA ANALYSIS 
    // ========================================== 
    
    // Method to analyze test results and calculate metrics
    analyze() { 
        // Display analysis start message
        console.log('\n📊 Analyzing results...'); 
        
        // Count total number of results
        const total = this.results.length; 
        
        // Count passed tests
        // .filter creates new array with only items matching condition
        // r => r.status === 'passed' checks if status is 'passed'
        // .length gives count of filtered items
        const passed = this.results.filter(r => r.status === 'passed').length; 
        
        // Count failed tests using same pattern
        const failed = this.results.filter(r => r.status === 'failed').length; 
        
        // Extract all valid durations (greater than 0)
        // First .map extracts just duration values
        // Second .filter keeps only positive durations
        const durations = this.results.map(r => r.duration).filter(d => d > 0); 
        
        // Calculate average duration
        // .reduce sums all durations: (a, b) => a + b
        // Start with 0 as initial value
        // Divide sum by count to get average
        const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length; 
        
        // Store all calculated metrics in metrics object
        this.metrics = { 
            total,              // Total test count
            passed,             // Passed test count
            failed,             // Failed test count
            
            // Calculate pass rate percentage
            // (passed / total) * 100 gives percentage
            // .toFixed(2) rounds to 2 decimal places, returns string
            passRate: ((passed / total) * 100).toFixed(2), 
            
            // Format average duration to 2 decimal places
            avgDuration: avgDuration.toFixed(2), 
            
            // Find maximum duration using spread operator
            // ...durations spreads array into individual arguments
            // Math.max returns largest value
            slowest: Math.max(...durations), 
            
            // Find minimum duration
            // Math.min returns smallest value
            fastest: Math.min(...durations) 
        }; 
        
        // Display completion message
        console.log('✅ Analysis complete'); 
        
        // Return this for method chaining
        return this; 
    } 
    
    // ========================================== 
    // REPORT GENERATION 
    // ========================================== 
    
    // Method to display formatted analysis report
    generateReport() { 
        // If metrics haven't been calculated yet, calculate them
        // ! means NOT - so if metrics is null/undefined
        if (!this.metrics) this.analyze(); 
        
        // Display report header
        // '\n' adds blank line before report
        // '='.repeat(50) creates string of 50 equal signs
        console.log('\n' + '='.repeat(50)); 
        
        // Display centered title with padding spaces
        console.log('           TEST ANALYSIS REPORT'); 
        
        // Display separator line
        console.log('='.repeat(50)); 
        
        // Display total tests using template literal
        // ${} embeds variable value in string
        console.log(`Total Tests: ${this.metrics.total}`); 
        
        // Display passed count with percentage
        console.log(`Passed: ${this.metrics.passed} (${this.metrics.passRate}%)`); 
        
        // Display failed count
        console.log(`Failed: ${this.metrics.failed}`); 
        
        // Display average duration with 's' suffix
        console.log(`Avg Duration: ${this.metrics.avgDuration}s`); 
        
        // Display slowest test duration
        console.log(`Slowest: ${this.metrics.slowest}s`); 
        
        // Display fastest test duration
        console.log(`Fastest: ${this.metrics.fastest}s`); 
        
        // Display footer separator
        console.log('='.repeat(50)); 
        
        // Return this for method chaining
        return this; 
    } 
    
    // ========================================== 
    // DATA EXPORT 
    // ========================================== 
    
    // Method to export results as formatted JSON string
    exportJSON() { 
        // JSON.stringify converts JavaScript object to JSON string
        // First parameter: data to convert (this.results array)
        // Second parameter: replacer function (null = use default)
        // Third parameter: indentation (2 = 2 spaces for readability)
        return JSON.stringify(this.results, null, 2); 
    } 
    
    // Method to export results as CSV format
    exportCSV() { 
        // If no results, return empty string
        if (this.results.length === 0) return ''; 
        
        // Extract headers from first result object
        // Object.keys returns array of property names
        const headers = Object.keys(this.results[0]); 
        
        // Convert each result object to CSV row
        // Outer .map processes each result
        const rows = this.results.map(result =>  
            // Inner .map processes each header/column
            headers.map(header => { 
                // Get value for this column from result object
                const value = result[header]; 
                
                // If value is string, wrap in quotes for CSV format
                // Prevents issues with commas in text
                if (typeof value === 'string') return `"${value}"`; 
                
                // Otherwise return value as-is (number, boolean, etc.)
                return value; 
            }).join(',')  // Join column values with commas
        ); 
        
        // Combine headers and rows
        // headers.join(',') creates header row
        // ...rows spreads all data rows
        // .join('\n') joins all rows with newlines
        return [headers.join(','), ...rows].join('\n'); 
    } 
} 

// ========================================== 
// USAGE EXAMPLE 
// ========================================== 

// Display demo header
console.log("🧪 TEST DATA PROCESSOR DEMO\n"); 

// Sample CSV data as multiline string
// Uses template literal (backticks) for multiline text
const sampleCSV = ` 
id,name,status,duration,browser 
TC001,Login,passed,2.5,chrome 
TC002,Search,failed,3.2,firefox 
TC003,Checkout,passed,4.1,chrome 
TC004,Payment,failed,2.9,safari 
`.trim();  // .trim() removes leading/trailing whitespace

// Create new instance of TestDataProcessor class
// 'new' keyword calls constructor and creates object
const processor = new TestDataProcessor(); 

// Method chaining - call multiple methods in sequence
// Each method returns 'this' so next method can be called
processor 
    .importCSV(sampleCSV)   // Import CSV data
    .validate()              // Validate imported data
    .analyze()               // Analyze results
    .generateReport();       // Display report

// Display export section header
console.log("\n📤 Exported as JSON (preview):"); 

// Export as JSON and show first 200 characters
// .exportJSON() returns full JSON string
// .substring(0, 200) extracts first 200 characters
// + '...' adds ellipsis to show it's truncated
console.log(processor.exportJSON().substring(0, 200) + '...');