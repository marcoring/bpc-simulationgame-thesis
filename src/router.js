import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "./views/LandingPage.vue";
import Dashboard from "./views/Dashboard.vue";
import Purchasing from "./views/Purchasing.vue";
import Logistics from "./views/Logistics.vue";
import FramePreparation from "./views/FramePreparation.vue";
import SensorsPreparation from "./views/SensorsPreparation.vue";
import EnginePreparation from "./views/EnginePreparation.vue";
import BatteryPreparation from "./views/BatteryPreparation.vue";
import BikeConstruction from "./views/BikeConstruction.vue";
import AppDevAndMaintenance from "./views/AppDevAndMaintenance.vue";
import QualityAssurance from "./views/QualityAssurance.vue";
import Sales from "./views/Sales.vue";
import PageNotFound from "./views/PageNotFound.vue";
import ChartsContainer from "./components/charts/ChartsContainer.vue";
import ChatComponent from "./components/ChatComponent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: {
      visible: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      visible: true,
    },
  },
  {
    path: "/purchasing",
    name: "Purchasing",
    component: Purchasing,
    meta: {
      visible: true,
    },
  },
  {
    path: "/logistics",
    name: "Logistics",
    component: Logistics,
    meta: {
      visible: true,
    },
  },
  {
    path: "/framePreparation",
    name: "FramePreparation",
    component: FramePreparation,
    meta: {
      visible: true,
    },
  },
  {
    path: "/sensorsPreparation",
    name: "SensorsPreparation",
    component: SensorsPreparation,
    meta: {
      visible: true,
    },
  },
  {
    path: "/enginePreparation",
    name: "EnginePreparation",
    component: EnginePreparation,
    meta: {
      visible: true,
    },
  },
  {
    path: "/batteryPreparation",
    name: "BatteryPreparation",
    component: BatteryPreparation,
    meta: {
      visible: true,
    },
  },
  {
    path: "/bikeConstruction",
    name: "BikeConstruction",
    component: BikeConstruction,
    meta: {
      visible: true,
    },
  },
  {
    path: "/appDevAndMaintenance",
    name: "AppDevAndMaintenance",
    component: AppDevAndMaintenance,
    meta: {
      visible: true,
    },
  },
  {
    path: "/qualityAssurance",
    name: "QualityAssurance",
    component: QualityAssurance,
    meta: {
      visible: true,
    },
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sales,
    meta: {
      visible: true,
    },
  },
  {
    path: "/charts",
    name: "Charts",
    component: ChartsContainer,
    meta: {
      visible: true,
    },
  },
  {
    path: "/chat",
    name: "Chat",
    component: ChatComponent,
    meta: {
      visible: true,
    },
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      visible: true,
    },
  },
];

const router = new VueRouter({
  // TODO History Mode einf??hren, SAP Server muss richtig konfiguriert werden das er das unterst??tzt
  //mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes,
});

export default router;
