const PostHogUtils = {
  filterClickEvent(eventID, dataSet) {
    return dataSet.filter((d) => d.properties.id === eventID);
  },
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
      console.log(
        `🤖 Done fetching ${eventData.length} ${eventName} events...  🏁`
      );
      setData([...eventData]);
      return `🤖 Done fetching ${eventName} event data...  🏁`;
    }

    try {
      if (URL) {
        const res = await fetch(`${URL}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer phx_5Sf1tL8OKhIUTh9cwb9mcNFfaAWFHc69MqlZW4xUQ10`,
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
        URL = `https://app.posthog.com/api/projects/16343/events/`;
        first = false;

        const res = await fetch(`${URL}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer phx_5Sf1tL8OKhIUTh9cwb9mcNFfaAWFHc69MqlZW4xUQ10`,
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
