const PostHogUtils = {
  filterClickEvent(eventID, dataSet) {
    return dataSet.filter((d) => d.properties.id === eventID);
  },
  filterEvents(eventID, dataSet) {
    let filterData = dataSet.filter(
      (data) => typeof data.properties.id !== "undefined"
    );
    filterData = filterData.filter((fdata) =>
      fdata.properties.id.includes(eventID)
    );
    return filterData;
  },
  // STEP 1:
  // - create get person, add person, list persons
  async getRecursiveEventData(
    URL = null,
    first = true,
    eventData = null,
    setData = null,
    eventName = null
  ) {
    console.log("✅ Fetching event data from posthog...");
    if (!eventData) {
      eventData = [];
    }

    if (!first && URL === null) {
      console.log(`⚙️ fetching ${eventData.length} ${eventName} events...`);

      // console.log("🚧 🦺 working here 🚧 🦺 ===> ", typeof eventData);
      // console.log("🚧 🦺 working here 🚧 🦺 ===> ", eventData);
      setData([...eventData]);
      return `🤖 Done fetching ${eventName} event data...  🏁`;
    }

    try {
      if (URL) {
        const res = await fetch(`${URL}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer phx_L00Urvk4g4BMTtbIjZOOazM7P9TELuXTHSSFkYM0U8p`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = await res.json();
        const filteredData = data.results.filter((e) => e.event === eventName);
        // console.log(filteredData);
        eventData = eventData.concat(filteredData);

        URL = data.next;
      } else {
        URL = `https://app.posthog.com/api/projects/18256/events/`;
        first = false;

        const res = await fetch(`${URL}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer phx_L00Urvk4g4BMTtbIjZOOazM7P9TELuXTHSSFkYM0U8p`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = await res.json();
        const filteredData = data.results.filter((e) => e.event === eventName);
        eventData = eventData.concat(filteredData);

        URL = data.next;
      }

      this.getRecursiveEventData(URL, first, eventData, setData, eventName);
    } catch (err) {
      console.log(err);
    }
  },
};

export default PostHogUtils;
