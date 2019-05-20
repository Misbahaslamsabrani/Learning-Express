console.log('this a test of serving js file at client side')
function fetchMeaning(){
    console.log("fetching data . . . . ");
    const txtbox = document.getElementById("txt")
    const word = txtbox.value;
    txtbox.value="";

    /* const url = "http://localhost:4040/search?word="+word; */
    
    const url = "/search?word="+word;
    
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if(data.error){
            document.getElementById("error").innerHTML = data.error;
            return
        }
        document.getElementById("word").innerHTML = data.word
        document.getElementById("def").innerHTML = data.def
    }).catch(error => document.getElementById("error").innerHTML = error)
}