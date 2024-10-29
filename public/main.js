// fetch spave data from "data.json"
const fetchSpaceData = async () => {
  try {
    const space_data = await fetch("data.json");
    if (!space_data.ok) {
      throw new Error(`Error fetching space data ${space_data.status}`);
    }
    space_data_results = await space_data.json();
  } catch (error) {
    console.error("error fetching!!!!", error);
    main.innerHTML = error;
  }
};

// Function to fetch HTML content for a specific page asynchronously
const fetchPageHtml = async (page) => {
  try {
    const response = await fetch(`${page}.html`);

    if (!response.ok) {
      throw new Error(`Error fetching destination.html: ${response.status}`);
    }
    const htmlContent = await response.text();

    return htmlContent;
  } catch (error) {
    console.error(`Error fetching ${page}.html:`, error);
    // Handle the error, e.g., display an error message to the user
    main.innerHTML = `An error occurred while fetching the ${page} content.`;
  }
};

// Function to generate page content based on the provided page name
const generatePage = (page) => {
  main.innerHTML = "";

  switch (page) {
    case "destination":
      changePageBackground(page);
      destinationHTML.then((html) => {
        main.innerHTML = html;
        handleDestinationClick();
      });
      break;
    case "crew":
      changePageBackground(page);
      crewHTML.then((html) => {
        main.innerHTML = html;
        handleCrewClick();
      });
      break;
    case "technology":
      changePageBackground(page);
      technologyHTML.then((html) => {
        main.innerHTML = html;
        handleTechnlogyClick();
      });
      break;
    case "home":
      changePageBackground(page);
      main.innerHTML = homecontent;
      break;
    default:
      return 0;
  }
};

// convert the animation from string to milliseconds
function convertToMilliS(animation_duration) {
  animation_duration = animation_duration.split("");
  animation_duration.pop(); // removes the "s" in the duration array e.g.[0, . , 4 , s] since s is the last element in unit of time

  return parseFloat(animation_duration.join("")) * 1000; //this joins the new aray and converts to float
}

const showSpaceContent = () => {
  main.style.display = "block";
  main.style.visibility = "visible"; // Show the content after it's ready
};

const loadPageFromHash = () => {
  document.getElementById("loading-screen").style.display = "none";

  showSpaceContent();

  const hash = window.location.hash.substring(1); // Removes the '#' from hash

  if (!hash) {
    generatePage("home"); // Load home if no hash is present
  } else {
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active-link");

      if (navLink.dataset.pagename == hash) {
        navLink.classList.add("active-link");
      }
    });

    generatePage(hash); // Load the page based on hash value
  }

  // After generating the page, show the content
};

let main = document.querySelector("#main-container");

window.addEventListener("hashchange", loadPageFromHash);
window.addEventListener("load", loadPageFromHash);

let space_data_results;

const homecontent = main.innerHTML;
const space_section = document.querySelector("#space-section");

/// caching of the destinationHtml to reduce redundant fetching
const destinationHTML = fetchPageHtml("destination");
const crewHTML = fetchPageHtml("crew");
const technologyHTML = fetchPageHtml("technology");

fetchSpaceData();

// set animation end time
let animation_duration = getComputedStyle(document.body).getPropertyValue(
  "--animation-duration"
);

let animation_duration_off = convertToMilliS(animation_duration);

// Function to handle destination link clicks and update content
function handleDestinationClick() {
  let destinationLinks = document.querySelectorAll(".destination-links");
  destinationLinks = Array.from(destinationLinks);

  let destinationData = space_data_results.destinations;
  let destination_image__container = document.querySelector(
    "#destination-img-container"
  );

  let destination_name = document.querySelector("#destination-name");
  let destination_description = document.querySelector(
    "#destination-description"
  );

  let destination_distance = document.querySelector("#destination-distance");
  let destination_travel = document.querySelector("#destination-travel");
  let destination_image = document.querySelector("#destination-image");

  setTimeout(() => {
    destination_image__container.classList.remove("slide-in_initial");
  }, animation_duration_off);

  //  mobile interactions
  let destinationIndex = 0;

  destination_image__container.addEventListener(
    "touchstart",
    handleTouchStart,
    false
  );
  destination_image__container.addEventListener(
    "touchmove",
    handleTouchMove,
    false
  );
  destination_image__container.addEventListener(
    "touchend",
    (event) => {
      handleTouchEnd(event);

      async function handleDestinationGesture() {
        const changeinX = touchEndX - touchStartX;
        const changeinY = touchEndY - touchStartY;
        destinationIndex++;

        if (
          Math.abs(changeinX) > Math.abs(changeinY) &&
          Math.abs(changeinX) > threshold
        ) {
          if (changeinX > 0) {
            alert("On path");

            destinationLinks.forEach((link) => {
              link.classList.remove("active-link");
            });
            destinationLinks[index].classList.add("active-link");

            const imagePromise = new Promise((resolve) => {
              const tempImage = new Image();
              tempImage.onload = () => {
                destination_image.setAttribute("src", tempImage.src);
                resolve();
              };

              tempImage.src = destinationData[index].images.webp;
            });

            destination_image.setAttribute(
              "alt",
              `${destinationData[index].name} image`
            );

            await imagePromise;

            // slide in on click fr destination image
            destination_image__container.classList.add("slide-in_onclick");

            setTimeout(() => {
              destination_image__container.classList.remove("slide-in_onclick");
            }, animation_duration_off);

            destination_name.textContent = destinationData[index].name;
            destination_description.textContent =
              destinationData[index].description;
            destination_distance.textContent = destinationData[index].distance;
            destination_travel.textContent = destinationData[index].travel;
            // Rest of the code here
          } else {
            alert("Swipe Left");
          }
        }
      }

      handleDestinationGesture();
    },
    false
  );

  // Desktop and tab interactions
  destinationLinks.forEach((destination) => {
    destination.addEventListener("click", async (e) => {
      e.preventDefault();
      let destinationIndex = destinationLinks.indexOf(destination);

      // Move to destination link that's clicked and manipulate html content
      destinationLinks.forEach((link) => {
        link.classList.remove("active-link");
      });
      destination.classList.add("active-link");

      const imagePromise = new Promise((resolve) => {
        const tempImage = new Image();
        tempImage.onload = () => {
          destination_image.setAttribute("src", tempImage.src);
          resolve();
        };

        tempImage.src = destinationData[destinationIndex].images.webp;
      });

      destination_image.setAttribute(
        "alt",
        `${destinationData[destinationIndex].name} image`
      );

      await imagePromise;

      // slide in on click fr destination image
      destination_image__container.classList.add("slide-in_onclick");

      setTimeout(() => {
        destination_image__container.classList.remove("slide-in_onclick");
      }, animation_duration_off);

      destination_name.textContent = destinationData[destinationIndex].name;
      destination_description.textContent =
        destinationData[destinationIndex].description;
      destination_distance.textContent =
        destinationData[destinationIndex].distance;
      destination_travel.textContent = destinationData[destinationIndex].travel;
    });
  });
}

function handleCrewClick() {
  // alert("crew");
  //   alert(space_data_results);
  let crewData = space_data_results.crew;
  let tabBtns = Array.from(document.querySelectorAll(".crew-tab-button"));
  let crewMemberRole = document.querySelector("#crew-member-role");
  let crewMemberName = document.querySelector("#crew-member-name");
  let crewMemberBio = document.querySelector("#crew-member-bio");
  let crewMemberImg = document.querySelector("#crew-member-img");
  let crewImgContainer = document.querySelector("#crew-img__container");

  setTimeout(() => {
    crewImgContainer.classList.remove("slide-in_from_right");
  }, animation_duration_off);

  tabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", async () => {
      const crewMemberIndex = tabBtns.indexOf(tabBtn);

      // Start loading image first

      // Update other content
      tabBtns.forEach((btn) => btn.classList.remove("active-crew-tab"));
      tabBtn.classList.add("active-crew-tab");

      crewMemberName.textContent = crewData[crewMemberIndex].name;
      crewMemberBio.textContent = crewData[crewMemberIndex].bio;
      crewMemberRole.textContent = crewData[crewMemberIndex].role;

      const imagePromise = new Promise((resolve) => {
        const tempImage = new Image();
        tempImage.onload = () => {
          crewMemberImg.setAttribute("src", tempImage.src);
          resolve();
        };
        tempImage.src = crewData[crewMemberIndex].images.webp;
      });

      crewMemberImg.setAttribute(
        "srt",
        `image of ${crewData[crewMemberIndex].image}`
      );

      // Wait for image to load before animation
      await imagePromise;

      crewImgContainer.classList.add("slide-in_from_right");

      setTimeout(() => {
        crewImgContainer.classList.remove("slide-in_from_right");
      }, animation_duration_off);
    });
  });
}

function handleTechnlogyClick() {
  let technology_tabs = Array.from(
    document.querySelectorAll(".technology-tab")
  );
  let technology_name = document.querySelector("#technology-name");
  let technology_description = document.querySelector(
    "#technology-description"
  );
  let technology_image_mobile = document.querySelector(
    "#technology-image__mobile"
  );
  let technology_image_desktop = document.querySelector(
    "#technology-image__desktop"
  );
  let technology_image_desktop_container = document.querySelector(
    "#technology-image__desktop_conatiner"
  );
  let technology_image_mobile_container = document.querySelector(
    "#technology-image__mobile_conatiner"
  );

  // fetch spave data from "data.json"

  let technologyData = space_data_results.technology;

  let slide_duration = getComputedStyle(
    technology_image_desktop_container
  ).getPropertyValue("--slide-duration");

  let slide_duration_off = convertToMilliS(slide_duration);

  // alert(slide_duration_off);
  setTimeout(() => {
    window.matchMedia("(max-width: 768px)").matches
      ? technology_image_mobile_container.classList.remove("slide-down")
      : technology_image_desktop_container.classList.remove("slide-down");
  }, slide_duration_off);

  technology_tabs.forEach((technologyTab) => {
    let technologyIndex = technology_tabs.indexOf(technologyTab);

    technologyTab.addEventListener("click", async () => {
      technology_tabs.forEach((technologyTab) => {
        technologyTab.classList.remove("active-technology__tab");
      });
      technologyTab.classList.add("active-technology__tab");

      technology_name.innerHTML = technologyData[technologyIndex].name;
      technology_description.innerHTML =
        technologyData[technologyIndex].description;

      const loadImageBasedOnScreenSize = () => {
        // Create a temporary image obj
        const tempImage = new Image();

        return new Promise((resolve) => {
          // Function to load the image based on screen size
          const loadImage = () => {
            // Check if the screen size matches mobile or desktop
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            const imageSrc = isMobile
              ? technologyData[technologyIndex].images.landscape
              : technologyData[technologyIndex].images.portrait;

            // Set onload handler for the temporary image
            tempImage.onload = () => {
              // Set the src attribute of the appropriate image element based on screen size
              if (isMobile) {
                technology_image_mobile.setAttribute("src", tempImage.src);
                technology_image_mobile_container.classList.add(
                  "slide-in_from_right"
                );
              } else {
                technology_image_desktop.setAttribute("src", tempImage.src);
                technology_image_desktop_container.classList.add("slide-down");
              }

              resolve();
            };

            // Set the src of the temporary image to start loading
            tempImage.src = imageSrc;
          };

          // Load the image initially
          loadImage();

          // Optional: Add an event listener to reload the image if the screen size changes
          window.addEventListener("resize", () => {
            loadImage();
          });
        });
      };

      // Call the function and wait for the image to load
      await loadImageBasedOnScreenSize();

      setTimeout(() => {
        window.matchMedia("(max-width: 768px)").matches
          ? technology_image_mobile_container.classList.remove(
              "slide-in_from_right"
            )
          : technology_image_desktop_container.classList.remove("slide-down");
      }, slide_duration_off);
    });
  });
  // Function to fetch HTML content for a specific page asynchronously
}

// Logic for the navigation links
let navLinks = Array.from(document.querySelectorAll(".nav-link"));
let previousPage = "home";

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((navLink) => navLink.classList.remove("active-link"));
    navLink.classList.add("active-link");

    const pageName = navLink.dataset.pagename;

    history.pushState({ page: pageName }, "", `#${pageName}`);

    // changePageBackground(pageName);
    // document.getElementById("loading-screen").style.display = "block";
    generatePage(pageName);
    // document.getElementById("loading-screen").style.display = "none";
  });
});

document.querySelector("#main-container").addEventListener("click", (event) => {
  if (event.target.id === "explore-btn") {
    navLinks.forEach((navLink) => navLink.classList.remove("active-link"));

    let destinationLink = navLinks.find(
      (navLink) => navLink.dataset.pagename == "destination"
    );

    destinationLink.classList.add("active-link");
    let page = destinationLink.dataset.pagename;

    generatePage(page);
  }
});

const changePageBackground = (page) => {
  // Replace old classes using requestAnimationFrame
  requestAnimationFrame(() => {
    space_section.classList.replace(
      `bg-${previousPage}-mobile`,
      `bg-${page}-mobile`
    );
    space_section.classList.replace(
      `md:bg-${previousPage}-tablet`,
      `md:bg-${page}-tablet`
    );
    space_section.classList.replace(
      `lg:bg-${previousPage}-desktop`,
      `lg:bg-${page}-desktop`
    );

    previousPage = page;
  });
};

// mobile
let closeBtn = document.querySelector("#close-button");
let hamBurger = document.querySelector("#hamburger");
let navbar = document.querySelector("#nav");

hamBurger.addEventListener("click", () => {
  navbar.classList.add("slide-in_from_right");
  navbar.classList.replace("hidden", "flex");
});

closeBtn.addEventListener("click", () => {
  navbar.classList.replace("flex", "hidden");
});

window.addEventListener("popstate", (e) => {
  const pageName = e.state ? e.state.page : "home";
  navLinks.forEach((navLink) => {
    navLink.classList.remove("active-link");

    if (navLink.dataset.pagename == pageName) {
      navLink.classList.add("active-link");
    }
  });

  generatePage(pageName);
});

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
const threshold = 50;

const handleTouchStart = (event) => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY; // Corrected here
};

function handleTouchMove(event) {
  // Uncomment the following line only if necessary to prevent scroll
  event.preventDefault();
}

const handleTouchEnd = (event) => {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY; // Corrected here

  // handleSwipegesture();
};

const handleSwipegesture = () => {
  const changeinX = touchEndX - touchStartX;
  const changeinY = touchEndY - touchStartY;

  if (
    Math.abs(changeinX) > Math.abs(changeinY) &&
    Math.abs(changeinX) > threshold
  ) {
    if (changeinX > 0) {
      alert("Swipe Right");
    } else {
      alert("Swipe Left");
    }
  } else if (
    Math.abs(changeinY) > Math.abs(changeinX) &&
    Math.abs(changeinY) > threshold
  ) {
    if (changeinY > 0) {
      alert("Swipe Down");
    } else {
      alert("Swipe Up");
    }
  }
};
