import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart as RNPieChart } from 'react-native-gifted-charts';

const theme = {
  toDoColor: '#CC0000',
  progressColor: '#c7d4e2',
  completedColor: '#CC0000',
  frameBackground: '#EFE6DE',
  textPrimary: '#c7d4e2',
  textSecondary: '#E0E0E0',
};

const PieLabelRow = ({ label, percentage, color }) => (
  <View style={styles.labelRow}>
    <View style={styles.labelContent}>
      <View style={[styles.colorDot, { backgroundColor: color }]} />
      <Text style={styles.labelText}>{label}:</Text>
    </View>
    <Text style={styles.percentageText}>{percentage}%</Text>
  </View>
);

const PieChart = ({ data }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const isLargeScreen = width > 1024;

  if (!data) return null;

  const handleReset = async () => {
    await removeItem('login');
    navigation.push('Dashboard')
  }

  const totalTasks =
    data.todoTaskCount +
    data.progressTaskCount +
    data.completeTaskCount;

  if (totalTasks === 0) return null;

  const percent = value => ((value / totalTasks) * 100).toFixed(0);

  const pieData = [
    { value: data.todoTaskCount, color: theme.toDoColor },
    { value: data.progressTaskCount, color: theme.progressColor },
    { value: data.completeTaskCount, color: theme.completedColor, focused: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Minha Meta</Text>
      <View style={styles.row}>

        <View style={styles.leftContainer}>
          <Text style={styles.secondaryText}>Progresso do Projeto</Text>

          <View style={styles.labelsContainer}>
            <PieLabelRow
              label="A Fazer"
              percentage={percent(data.todoTaskCount)}
              color={theme.toDoColor}
            />
            <PieLabelRow
              label="Em Andamento"
              percentage={percent(data.progressTaskCount)}
              color={theme.progressColor}
            />
            <PieLabelRow
              label="Concluído"
              percentage={percent(data.completeTaskCount)}
              color={theme.completedColor}
            />
          </View>
        </View>

        <View style={styles.separator} />

        <View style={[styles.rightContainer, isLargeScreen && styles.rightContainerLarge]}>
          <RNPieChart
            data={pieData}
            donut
            radius={isLargeScreen ? 70 : 60}
            innerRadius={isLargeScreen ? 40 : 30}
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={styles.centerPercentage}>
                  {percent(data.completeTaskCount)}%
                </Text>
                <Text style={styles.centerText}>Concluído</Text>
              </View>
            )}
          />
        </View>

        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.frameBackground,
    borderRadius: 20,
    overflow: 'hidden',
  },
  txt: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  leftContainer: {
    width: '50%',
    padding: 20,
  },
  secondaryText: {
    color: theme.textSecondary,
    fontSize: 16,
    marginBottom: 20,
  },
  labelsContainer: {
    gap: 12,
  },
  separator: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  rightContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  rightContainerLarge: {
    justifyContent: 'flex-start',
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerPercentage: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  centerText: {
    fontSize: 14,
    color: theme.textPrimary,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  labelText: {
    fontSize: 16,
    color: theme.textPrimary,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PieChart;
