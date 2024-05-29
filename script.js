console.log("Lets start Javascript")


async function main() {
    let a = await fetch("C:\Coding\Frontend Projects\Spotify Clone\songs");
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName(".mp3")
    console.log(as)

}


