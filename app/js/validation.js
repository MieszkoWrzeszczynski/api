const fields = ["author", "title","year"];

function valid_fields(fields) {
    return function(request_body) {
        const provided_fields = Object.keys(request_body);
   
        for(let i = 0; i < provided_fields.length; i++) {
            if (fields.indexOf(provided_fields[i]) === -1) { 
                throw new Error("A field was not found!"); 
            }
        }
        return true;
    }
}

const isValid = valid_fields(fields);

module.exports = isValid;