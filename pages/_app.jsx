import "../styles/globals.scss";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";

function MyApp({ Component, pageProps, session }) {
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelState, setPanelState] = useState({
    activeDemoCard: null,
    isGlobalPanelOpen: null,
    demos: [
      {
        id: "ma",
        title: "Maintenance Advisor",
        description:
          "Prevent unplanned downtime and improve efficiency with artificial intelligence (AI)-powered anomaly detection and predictive maintenance.",

        demoSites: {
          type: "demo-site",
          title: "Demo Sites",
          titleIcon: "/site-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://demo-3.sp.sales.sparkcognition.com/login",
            "https://demo-3.sp.sales.sparkcognition.com/login",
          ],
        },
        clickProtos: {
          type: "prototype",
          title: "Clickthrough Prototypes",
          titleIcon: "/prototype-icon.png",
          mediaIcon: "/figma-logo.svg",
          media: [
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
          ],
        },
        presentations: {
          type: "presentation",
          title: "Presentations",
          titleIcon: "/presentation-icon.png",
          mediaIcon: "/ppt-icon.png",
          media: [
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
          ],
        },
        videos: {
          type: "video",
          title: "Videos",
          titleIcon: "/video-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
          ],
        },
      },
      {
        id: "ra",
        title: "Record Analysis",
        description:
          "Respond to changes in business and get answers to specific queries or analytics that support decision making.",
        demoSites: {
          type: "demo-site",
          title: "Demo Sites",
          titleIcon: "/site-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://demo-3.sp.sales.sparkcognition.com/login1",
            "https://demo-3.sp.sales.sparkcognition.com/login1",
          ],
        },
        clickProtos: {
          type: "prototype",
          title: "Clickthrough Prototypes",
          titleIcon: "/prototype-icon.png",
          mediaIcon: "/figma-logo.svg",
          media: [
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
          ],
        },
        presentations: {
          type: "presentation",
          title: "Presentations",
          titleIcon: "/presentation-icon.png",
          mediaIcon: "/ppt-icon.png",
          media: [
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
          ],
        },
        videos: {
          type: "video",
          title: "Videos",
          titleIcon: "/video-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
          ],
        },
      },
      {
        id: "va",
        title: "Visual AI Advisor",
        description:
          "Transform your existing camera infrastructure with intelligent computer vision software.",
        demoSites: {
          type: "demo-site",
          title: "Demo Sites",
          titleIcon: "/site-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://demo-3.sp.sales.sparkcognition.com/login2",
            "https://demo-3.sp.sales.sparkcognition.com/login2",
          ],
        },
        clickProtos: {
          type: "prototype",
          title: "Clickthrough Prototypes",
          titleIcon: "/prototype-icon.png",
          mediaIcon: "/Figma-logo.svg",
          media: [
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
          ],
        },
        presentations: {
          type: "presentation",
          title: "Presentations",
          titleIcon: "/presentation-icon.png",
          mediaIcon: "/ppt-icon.png",
          media: [
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
          ],
        },
        videos: {
          type: "video",
          title: "Videos",
          titleIcon: "/video-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
          ],
        },
      },
      {
        id: "rs",
        title: "Renewable Suit",
        description:
          "Artificial intelligence (AI)-powered renewable energy asset performance management platform for solar, wind, hydro, and storage.",
        demoSites: {
          type: "demo-site",
          title: "Demo Sites",
          titleIcon: "/site-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://demo-3.sp.sales.sparkcognition.com/login",
            "https://demo-3.sp.sales.sparkcognition.com/login",
          ],
        },
        clickProtos: {
          type: "prototype",
          title: "Clickthrough Prototypes",
          titleIcon: "/prototype-icon.png",
          mediaIcon: "/figma-logo.svg",
          media: [
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
            "https://www.figma.com/file/CCocAQeNX8QPJEotDtSSu5/Sales-Demo-Portal?node-id=81%3A24267&t=2PCdDCrmZWnAZMQD-0",
          ],
        },
        presentations: {
          type: "presentation",
          title: "Presentations",
          titleIcon: "/presentation-icon.png",
          mediaIcon: "/ppt-icon.png",
          media: [
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
            "https://docs.google.com/presentation/d/1FqzLK-ia3lLc2rau4xxeGdrLMbxEMXiM/edit?usp=sharing&ouid=105375117270411739184&rtpof=true&sd=true",
          ],
        },
        videos: {
          type: "video",
          title: "Videos",
          titleIcon: "/video-icon.png",
          mediaIcon: "/link-icon.png",
          media: [
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
            "https://drive.google.com/file/d/17Fc1a-SRX5Pb3PgSAaJm9kZ6BxN2v4kf/view?usp=sharing",
          ],
        },
      },
    ],
  });

  useEffect(() => {
    // Init PostHog
    posthog.init("phc_jzSUsTcbTXr9jeM6AMlk9qkHU9Mv9WzsadvKtXjwQ7k", {
      api_host: "https://app.posthog.com",
    });

    // Track page views
    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const setActiveDemoCard = (activeDemoCard) => {
    setPanelState((existingValues) => ({
      ...existingValues,
      activeDemoCard,
    }));
  };

  const setGlobalPanelOpen = (isGlobalPanelOpen) => {
    setPanelState((existingValues) => ({
      ...existingValues,
      isGlobalPanelOpen,
    }));
  };

  const state = {
    panelState,
    setActiveDemoCard,
    setGlobalPanelOpen,
  };

  return (
    <SessionProvider session={session}>
      <AppContext.Provider value={state}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
