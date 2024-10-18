// let space_data_results;
// let main = document.querySelector("#main-container");
let technology_tabs = Array.from(document.querySelectorAll(".technology-tab"));
let technology_name = document.querySelector("#technology-name");
let technology_description = document.querySelector("#technology-description");
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

fetchSpaceData().then(() => {
  let technologyData = space_data_results.technology;

  let slide_duration = getComputedStyle(
    technology_image_desktop_container
  ).getPropertyValue("--slide-duration");

  slide_duration = slide_duration.split("");
  slide_duration.pop();

  let slide_duration_off = parseFloat(slide_duration.join("")) * 1000;
  alert(slide_duration_off);
  setTimeout(() => {
    technology_image_desktop_container.style.display == "none"
      ? technology_image_mobile_container.classList.remove("slide-down")
      : technology_image_desktop_container.classList.remove("slide-down");
  }, slide_duration_off);

  technology_tabs.forEach((technologyTab) => {
    let technologyIndex = technology_tabs.indexOf(technologyTab);

    technologyTab.addEventListener("click", () => {
      technology_tabs.forEach((technologyTab) => {
        technologyTab.classList.remove("active-technology__tab");
      });
      technologyTab.classList.add("active-technology__tab");

      technology_name.innerHTML = technologyData[technologyIndex].name;
      technology_description.innerHTML =
        technologyData[technologyIndex].description;

      // technology_image_desktop_container.classList.add("slide-down");

      technology_image_desktop_container.style.display != "none"
        ? technology_image_desktop_container.classList.add("slide-down")
        : technology_image_mobile_container.classList.add("slide-down");

      setTimeout(() => {
        technology_image_desktop_container.style.display == "none"
          ? technology_image_mobile_container.classList.remove("slide-down")
          : technology_image_desktop_container.classList.remove("slide-down");
      }, slide_duration_off);

      technology_image_desktop.setAttribute(
        "src",
        technologyData[technologyIndex].images.portrait
      );
      technology_image_mobile.setAttribute(
        "src",
        technologyData[technologyIndex].images.landscape
      );
    });
  });
});

// Function to fetch HTML content for a specific page asynchronously
