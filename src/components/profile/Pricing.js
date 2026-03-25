import React from "react";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  Box,
  Card,
} from "@mui/material";

const features = [
  { id: 1, label: "Support 24/7" },
  { id: 2, label: "Accès illimité" },
  { id: 3, label: "Export PDF" },
];

const plans = [
  {
    title: "Basic",
    price: 9,
    offerPrice: 0,
    featureTitle: "Fonctionnalités",
    featuresID: [1],
    active: false,
    buttonText: "Choisir Basic",
    onClick: () => console.log("Basic"),
  },
  {
    title: "Pro",
    price: 29,
    offerPrice: 19,
    featureTitle: "Fonctionnalités",
    featuresID: [1, 2, 3],
    active: true,
    buttonText: "Choisir Pro",
    onClick: () => console.log("Pro"),
  },
];

export default function Pricing({ heading, caption }) {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Stack spacing={6}>
        {heading && (
          <Stack spacing={2} textAlign="center">
            <Typography variant="h3">{heading}</Typography>
            {caption && (
              <Typography variant="body1" color="text.secondary">
                {caption}
              </Typography>
            )}
          </Stack>
        )}

        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 4,
                  border: plan.active ? "2px solid" : "1px solid",
                  borderColor: plan.active ? "primary.main" : "divider",
                }}
              >
                <Stack spacing={4} height="100%" justifyContent="space-between">
                  {/* Header */}
                  <Stack spacing={2} textAlign="center">
                    <Typography variant="subtitle1" color="text.secondary">
                      {plan.title}
                    </Typography>

                    <Stack>
                      <Typography variant="h4">
                        $
                        {plan.offerPrice && plan.offerPrice > 0
                          ? plan.offerPrice
                          : plan.price}
                      </Typography>

                      {plan.offerPrice && plan.offerPrice > 0 && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          ${plan.price}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>

                  {/* Features */}
                  <Stack spacing={3}>
                    <Divider>
                      <Chip label={plan.featureTitle} size="small" />
                    </Divider>

                    <Stack spacing={1}>
                      {features.map((feature) => {
                        const active = plan.featuresID?.includes(feature.id);

                        return (
                          <Stack
                            key={feature.id}
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: active ? "success.light" : "grey.300",
                                fontSize: 14,
                              }}
                            >
                              {active ? "✓" : "✕"}
                            </Avatar>

                            <Typography
                              variant="body2"
                              color={active ? "text.primary" : "text.secondary"}
                            >
                              {feature.label}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>

                  {/* Button */}
                  <Button
                    variant={plan.active ? "contained" : "outlined"}
                    fullWidth
                    onClick={plan.onClick}
                  >
                    {plan.buttonText || "Choisir"}
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
