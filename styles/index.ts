import { StyleSheet } from "react-native";

export const toastStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#27272A",
    backgroundColor: "#09090B",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  greeting: {
    color: "#71717A",
    fontSize: 16,
    fontWeight: "400",
  },
  userName: {
    color: "#FAFAFA",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    backgroundColor: "#18181B",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sectionTitle: {
    color: "#FAFAFA",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  // Projects
  projectsList: {
    paddingRight: 24,
  },
  projectCard: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    width: 200,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  projectColorIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  projectName: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  projectProgress: {
    color: "#71717A",
    fontSize: 14,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#27272A",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  projectTaskCount: {
    color: "#71717A",
    fontSize: 12,
  },

  // Quick Actions
  actionsList: {
    paddingRight: 24,
  },
  quickActionButton: {
    backgroundColor: "#18181B",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
    minWidth: 100,
  },
  quickActionText: {
    color: "#FAFAFA",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 8,
  },

  // Filters
  filtersList: {
    paddingRight: 24,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  filterButtonActive: {
    backgroundColor: "#FAFAFA",
    borderColor: "#FAFAFA",
  },
  filterButtonText: {
    color: "#71717A",
    fontSize: 14,
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#09090B",
  },

  // Tasks
  tasksSection: {
    paddingHorizontal: 24,
  },
  tasksList: {
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: "#18181B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#27272A",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  taskCategory: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskCategoryText: {
    color: "#71717A",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 6,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
  },
  taskTitle: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 22,
  },
  taskDescription: {
    color: "#71717A",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskMeta: {
    flex: 1,
  },
  taskAssignee: {
    color: "#FAFAFA",
    fontSize: 13,
    fontWeight: "500",
  },
  taskDueDate: {
    color: "#71717A",
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Toast
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  toastTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  toastTitle: {
    color: "#FAFAFA",
    fontSize: 14,
    fontWeight: "600",
  },
  toastDescription: {
    color: "#71717A",
    fontSize: 12,
    marginTop: 2,
  },
});
