var container = document.getElementById("array");
var barsSlider = document.getElementById("barsSlider");

// Function to generate the array of blocks
function generateArray() {
    var barsCount = parseInt(barsSlider.value);
    container.innerHTML = ''; // Clear the container

    // Creating an array
    var arr = [];
    var containerWidth=container.clientWidth;
    var maxBarWidth=Math.floor(containerWidth/barsCount)-2;

    // Filling array with random values
    for (var i = 0; i < barsCount; i++) {
        // Return a value from 1 to 100 (both inclusive)
        var val = Number(Math.ceil(Math.random() * 100));
        arr.push(val);
    }

    // Sorting Array in ascending order
    arr.sort(function (a, b) {
        return a - b;
    });

    for (var i = 0; i < barsCount; i++) {
        var value = arr[i];

        // Creating element div
        var array_ele = document.createElement("div");

        // Adding class 'block' to div
        array_ele.classList.add("block");

        // Adding style to div
        array_ele.style.width = `${maxBarWidth}px`;
        array_ele.style.height = `${value * 3}px`;
        // array_ele.style.transform = `translate(${i * 30}px)`;
        array_ele.style.transform = `translate(${i * (maxBarWidth + 2)}px)`;

        // Creating label element for displaying
        // size of particular block
        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        // Appending created elements to index.html
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }
}

// Function to update the number of bars dynamically
function updateBarsCount(value) {
    generateArray();
}

// Asynchronous BinarySearch function
async function BinarySearch(delay = 300) {
    var blocks = document.querySelectorAll(".block");
    var output = document.getElementById("text");

    // Extracting the value entered by the user
    var num = document.getElementById("fname").value;

    // Changing the color of all the blocks to violet
    for (var i = 0; i < blocks.length; i += 1) {
        blocks[i].style.backgroundColor = "#00FFFF";
    }

    output.innerText = "";

    // BinarySearch Algorithm
    var start = 0;
    var end = blocks.length - 1;
    var flag = 0;

    while (start <= end) {
        // Middle index
        var mid = Math.floor((start + end) / 2);
        blocks[mid].style.backgroundColor = "#FF4949";

        // Value at mid index
        var value = Number(blocks[mid].childNodes[0].innerHTML);

        // To wait for .1 sec
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        // Current element is equal to the element entered by the user
        if (value == num) {
            // output.innerText = "Element Found"; 
            document.getElementById("searchResult").innerText = "Element Found";
            blocks[mid].style.backgroundColor = "#13CE66";
            flag = 1;
            break;
        }
        // Current element is greater than the element entered by the user
        if (value > num) {
            end = mid - 1;
            blocks[mid].style.backgroundColor = "#00FFFF";
        } else {
            start = mid + 1;
            blocks[mid].style.backgroundColor = "#00FFFF";
        }
    }

    // When element is not found in the array
    if (flag == 0) {
        // output.innerText = "Element Not Found";
          
        document.getElementById("searchResult").innerText = "Element Not Found";
    }
}

// Calling generateArray function
generateArray();
