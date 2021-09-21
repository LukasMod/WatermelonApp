import React, { FC } from "react"
import { Dimensions, StyleSheet } from "react-native"
import withObservables from "@nozbe/with-observables"
import { LineChart } from "react-native-chart-kit"

import { observeWeights, Weight } from "../../db/model/helpers"
import { primaryColor } from "../header-logrocket/header-logrocket"

const windowDim = Dimensions.get("window")
export const windowWidth = windowDim.width
export const chartStyles = StyleSheet.create({
  chart: {
    borderRadius: 10,
    marginLeft: 15,
  },
})

export const chartConfig = {
  backgroundColor: primaryColor,
  backgroundGradientFrom: primaryColor,
  backgroundGradientTo: "#FFA726",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
}

const Chart: FC<{ weights: Weight[] }> = ({ weights }) => {
  if (weights.length < 1) {
    return null
  }

  const labels: string[] = []
  const data: number[] = []
  weights.forEach((w: Weight) => {
    labels.push(`${w?.createdAt.getDate()}/${w.createdAt.getMonth() + 1}`)
    data.push(w.weight)
  })
  return (
    <LineChart
      bezier
      height={250}
      width={windowWidth - 30}
      chartConfig={chartConfig}
      style={chartStyles.chart}
      data={{ labels, datasets: [{ data }] }}
    />
  )
}

const enhanceWithWeights = withObservables([], () => ({
  weights: observeWeights(),
}))

export default enhanceWithWeights(Chart)
