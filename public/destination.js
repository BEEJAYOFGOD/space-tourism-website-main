let main = document.querySelector("#main-container");
let body = document.body;
const homecontent = document.querySelector("#main-container").innerHTML;

let space_data_results;

const fetchSpaceData = async (page) => {
  try {
    const space_data = await fetch("data.json");
    space_data_results = await space_data.json();

    // main.innerHTML = ` `;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

fetchSpaceData();

const generatePage = (page) => {
  main.innerHTML = " ";

  console.log(space_data_results);
  switch (page) {
    case "destination":
      showDestination();
      break;
    case "home":
      main.innerHTML = homecontent;
      break;
    default:
      return 0;
  }
};

// console.log("ademola");
function showDestination() {
  document
    .querySelector("#space-section")
    .classList.replace("lg:bg-home-desktop", `lg:bg-destination-desktop`);

  // apply destination page html content
  main.innerHTML = `<main id="main-content" class="lg:px-28">
    <div class="flex gap-2">
      <span>01</span>
      <p>PICK YOUR DESTINATION</p>
    </div>

  <div class="flex w-full justify-between">
    <div class="flex-1">
      <img class="hover:rotate-45 border hover:border-red-600 cursor-pointer z-10" id="destination-image" src="../assets/destination/image-moon.png" alt="" />
    </div>
    <div class="flex-1 text-start">
    <div class="md:h-[60px]">
      <ul class="flex gap-6 h-full" id="destination-tabs">
        <li><a href="moon" class="destination-links active-link">MOON</a></li>
        <li><a href="mars" class="destination-links">MARS</a></li>
        <li><a href="europa" class="destination-links">EUROPA</a></li>
        <li><a href="titan" class="destination-links">TITAN</a></li>
      </ul>
    </div>
    <div>
    <div class="">
      <h2 class="text-8xl m-0 destination-name md:uppercase">MOON</h2>
      <div class="flex justify-between flex-col gap-28">
        <div>
          <p class="destination-description">
            See our planet as you've never seen it before. A perfect
            relaxing trip away to help regain perspective and come back
            refreshed. While you're there, take in some history by
            visiting the Luna 2 and Apollo 11 landing sites.
          </p>
        </div>
 
      <div>
        <hr class="w-full" />
          <div class="flex w-[60%] justify-between mt-8">
             <div>
                <p>AVG. DISTANCE</p>
                <p class="destination-distance">384,400 km</p>
              </div>
              <div>
                <p>EST. TRAVEL TIME</p>
                <p class="destination-travel">3 days</p>
              </div>
          </div>
      </div>
  </div>
  </div>
</div>
</main>`;

  // Select destination links again after the content is inserted into the DOM
  let destinationLinks = document.querySelectorAll(".destination-links");
  destinationLinks = Array.from(destinationLinks);
  let destinationData = space_data_results.destinations;

  destinationLinks.forEach((destination) => {
    destination.addEventListener("click", (e) => {
      e.preventDefault();

      destinationLinks.forEach((link) => {
        link.classList.remove("active-link");
      });

      let destinationIndex = destinationLinks.indexOf(destination);
      let destination_name = document.querySelector(".destination-name");
      let destination_description = document.querySelector(
        ".destination-description"
      );
      let destination_distance = document.querySelector(
        ".destination-distance"
      );
      let destination_travel = document.querySelector(".destination-travel");
      let destination_image = document.querySelector("#destination-image");

      console.log(destinationData[destinationIndex].images);

      // Move to destination link that's clicked and manipulate html content
      destination_image.setAttribute(
        "src",
        destinationData[destinationIndex].images.webp
      );
      destinationLinks[destinationIndex].classList.add("active-link");
      destination_name.textContent = destinationData[destinationIndex].name;
      destination_description.textContent =
        destinationData[destinationIndex].description;
      destination_distance.textContent =
        destinationData[destinationIndex].distance;
      destination_travel.textContent = destinationData[destinationIndex].travel;
    });
  });
}

let navLinks = Array.from(document.querySelectorAll(".nav-link"));

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((navLink) => navLink.classList.remove("active-link"));
    let linkIndex = navLinks.indexOf(navLink);
    navLinks[linkIndex].classList.add("active-link");

    const pageName = navLink.dataset.pagename;
    console.log(pageName);
    generatePage(pageName);
  });
});

document.querySelector("#main-container").addEventListener("click", (event) => {
  if (event.target.id === "explore-btn") {
    navLinks.forEach((navLink) => navLink.classList.remove("active-link"));

    let destinationLink = navLinks.find(
      (navLink) => navLink.dataset.pagename == "destination"
    );

    destinationLink.classList.add("active-link");
    generatePage(destinationLink.dataset.pagename);
  }
});
