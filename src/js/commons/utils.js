export function sortByKey(obj, key, order){
    obj.sort(function(a, b){
        if(order === 'asc') {
            return a[key] > b[key];
        }
        else {
            return a[key] < b[key];
        }                    
    });    
} 

export function formatDate(dateString, format='DD/MM/YYYY'){
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();  
    
    format = format.replace("MM", month.toString().replace(/^(\d)$/, '0$1'));

    if (format.indexOf("YYYY") > -1) {
        format = format.replace("YYYY", year.toString());
    } else if (format.indexOf("YY") > -1) {
        format = format.replace("YY", year.toString().substr(2, 2));
    }

    format = format.replace("DD", day.toString().replace(/^(\d)$/, '0$1'));    
    
    return format;
}

export function formatTrackTime(trackTime){
    const minutes = Math.floor(trackTime / 60000);
    const seconds = ((trackTime % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
} 

export function formatCurrency(currencyCode){
    switch(currencyCode) {
        case 'USD':
            return '&dollar;';
        case 'EUR':
            return '&euro;';
        case 'GBP':
            return '&pound;';
        // etc.
        default:
            return currencyCode;
    }
}

export function parseTemplate(html, options) {
    var re = /<%([^%>]+)?%>/g, 
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, 
        code = 'var r=[];\n', 
        cursor = 0, 
        match;
    var add = function(line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
             (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}