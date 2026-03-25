import React from "react";
import Header from "../header/Header";
import Pricing from "./Pricing";
import "./profile.css";
import UpdateProfile from "./UpdateProfile";
import Billing from "./Billing";
import Box from "@mui/joy/Box";
import { Tabs, TabPanel } from "@mui/joy";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
const Profile = () => {
  return (
    <div className="profile">
      <Header />
      <div className="main-profile">
        <Box sx={{ flex: 1, width: "90%", height: "85vh" }}>
          <Box
            sx={{
              position: "sticky",
              top: { sm: -100, md: -110 },
              bgcolor: "background.body",
              zIndex: 9995,
            }}
          >
            <Tabs defaultValue={0} sx={{ bgcolor: "transparent" }}>
              <TabList
                tabFlex={1}
                size="sm"
                sx={{
                  pl: { xs: 0, md: 4 },
                  justifyContent: "left",
                  [`&& .${tabClasses.root}`]: {
                    fontWeight: "600",
                    flex: "initial",
                    color: "text.tertiary",
                    [`&.${tabClasses.selected}`]: {
                      bgcolor: "transparent",
                      color: "text.primary",
                      "&::after": {
                        height: "2px",
                        bgcolor: "primary.500",
                      },
                    },
                  },
                }}
              >
                <Tab
                  value={0}
                  sx={{ borderRadius: "6px 6px 0 0" }}
                  indicatorInset
                >
                  Settings
                </Tab>
                <Tab
                  value={1}
                  sx={{ borderRadius: "6px 6px 0 0" }}
                  indicatorInset
                >
                  Plan
                </Tab>
                <Tab
                  value={2}
                  sx={{ borderRadius: "6px 6px 0 0" }}
                  indicatorInset
                >
                  Billing
                </Tab>
              </TabList>

              <TabPanel value={0}>
                <UpdateProfile />
              </TabPanel>

              <TabPanel value={1}>
                <Pricing />
              </TabPanel>

              <TabPanel value={2}>
                <Billing />
              </TabPanel>
            </Tabs>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
