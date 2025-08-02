import { ToastProviderWithViewport, useToast } from "@/components";
import { toastStyles as styles } from "@/styles/index";
import { Stack } from "expo-router";
import { SFSymbol, SymbolView } from "expo-symbols";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Todo" | "In Progress" | "Review" | "Done";
  assignee: string;
  dueDate: string;
  category: "Design" | "Development" | "Marketing" | "Research";
}

interface Project {
  id: number;
  name: string;
  progress: number;
  tasks: number;
  completedTasks: number;
  color: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  action: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    name: "Mobile App Redesign",
    progress: 75,
    tasks: 12,
    completedTasks: 9,
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "Website Launch",
    progress: 45,
    tasks: 8,
    completedTasks: 4,
    color: "#10B981",
  },
  {
    id: 3,
    name: "Brand Identity",
    progress: 90,
    tasks: 6,
    completedTasks: 5,
    color: "#F59E0B",
  },
];

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Design System Update",
    description: "Update component library with new tokens",
    priority: "High",
    status: "In Progress",
    assignee: "Sarah M.",
    dueDate: "Today",
    category: "Design",
  },
  {
    id: 2,
    title: "API Integration",
    description: "Connect frontend with backend services",
    priority: "Urgent",
    status: "Todo",
    assignee: "John D.",
    dueDate: "Tomorrow",
    category: "Development",
  },
  {
    id: 3,
    title: "User Testing",
    description: "Conduct usability tests for new features",
    priority: "Medium",
    status: "Review",
    assignee: "Alex K.",
    dueDate: "Next Week",
    category: "Research",
  },
  {
    id: 4,
    title: "Social Media Campaign",
    description: "Launch new product announcement campaign",
    priority: "Low",
    status: "Todo",
    assignee: "Emma L.",
    dueDate: "Next Month",
    category: "Marketing",
  },
  {
    id: 5,
    title: "Performance Optimization",
    description: "Improve app loading times and responsiveness",
    priority: "High",
    status: "Done",
    assignee: "Mike R.",
    dueDate: "Yesterday",
    category: "Development",
  },
  {
    id: 6,
    title: "Brand Guidelines",
    description: "Create comprehensive brand style guide",
    priority: "Medium",
    status: "In Progress",
    assignee: "Lisa T.",
    dueDate: "This Week",
    category: "Design",
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  { id: "new_task", title: "New Task", icon: "plus", action: "task_created" },
  {
    id: "deadlines",
    title: "Deadlines",
    icon: "clock",
    action: "deadline_reminder",
  },
  {
    id: "team",
    title: "Team",
    icon: "person.3.fill",
    action: "team_notification",
  },
  {
    id: "sync",
    title: "Sync",
    icon: "arrow.triangle.2.circlepath",
    action: "sync_success",
  },
];

const FILTER_OPTIONS = [
  "All",
  "Todo",
  "In Progress",
  "Review",
  "Done",
] as const;

const getPriorityColor = (priority: string): string => {
  const colors = {
    Low: "#71717A",
    Medium: "#3B82F6",
    High: "#F59E0B",
    Urgent: "#EF4444",
  };
  return colors[priority as keyof typeof colors] || "#71717A";
};

const getStatusColor = (status: string): string => {
  const colors = {
    Todo: "#71717A",
    "In Progress": "#3B82F6",
    Review: "#F59E0B",
    Done: "#10B981",
  };
  return colors[status as keyof typeof colors] || "#71717A";
};

const getCategoryIcon = (category: string): string => {
  const icons = {
    Design: "paintbrush",
    Development: "laptopcomputer",
    Marketing: "megaphone",
    Research: "magnifyingglass",
  };
  return icons[category as keyof typeof icons] || "folder";
};

const ProjectCard = React.memo<{ project: Project }>(({ project }) => {
  const progressWidth = `${project.progress}%`;

  return (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View
          style={[
            styles.projectColorIndicator,
            { backgroundColor: project.color },
          ]}
        />
        <Text style={styles.projectName} numberOfLines={2}>
          {project.name}
        </Text>
      </View>

      <Text style={styles.projectProgress}>{project.progress}% Complete</Text>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: progressWidth, backgroundColor: project.color } as any,
          ]}
        />
      </View>

      <Text style={styles.projectTaskCount}>
        {project.completedTasks}/{project.tasks} tasks
      </Text>
    </View>
  );
});

const QuickActionButton = React.memo<{
  action: QuickAction;
  onPress: (actionType: string) => void;
}>(({ action, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(action.action);
  }, [action.action, onPress]);

  return (
    <TouchableOpacity
      style={styles.quickActionButton}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <SymbolView
        name={action.icon as SFSymbol}
        size={20}
        tintColor="#FAFAFA"
      />
      <Text style={styles.quickActionText}>{action.title}</Text>
    </TouchableOpacity>
  );
});

const FilterButton = React.memo<{
  title: string;
  isActive: boolean;
  onPress: (filter: string) => void;
}>(({ title, isActive, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(title);
  }, [title, onPress]);

  return (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.filterButtonActive]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.filterButtonText,
          isActive && styles.filterButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
});

const TaskCard = React.memo<{
  task: Task;
  onTaskAction: (action: string, task: Task) => void;
}>(({ task, onTaskAction }) => {
  const priorityColor = getPriorityColor(task.priority);
  const statusColor = getStatusColor(task.status);
  const categoryIcon = getCategoryIcon(task.category);

  const handleComplete = useCallback(() => {
    onTaskAction("complete", task);
  }, [task.id, onTaskAction]);

  const handleAssign = useCallback(() => {
    onTaskAction("assign", task);
  }, [task.id, onTaskAction]);

  const handlePriorityChange = useCallback(() => {
    onTaskAction("priority", task);
  }, [task.id, onTaskAction]);

  return (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={handleComplete}
      onLongPress={handleAssign}
      activeOpacity={0.9}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskCategory}>
          <SymbolView
            name={categoryIcon as SFSymbol}
            size={16}
            tintColor="#71717A"
          />
          <Text style={styles.taskCategoryText}>{task.category}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.priorityBadge,
            { backgroundColor: priorityColor + "20" },
          ]}
          onPress={handlePriorityChange}
          activeOpacity={0.7}
        >
          <Text style={[styles.priorityText, { color: priorityColor }]}>
            {task.priority}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.taskTitle} numberOfLines={2}>
        {task.title}
      </Text>

      <Text style={styles.taskDescription} numberOfLines={3}>
        {task.description}
      </Text>

      <View style={styles.taskFooter}>
        <View style={styles.taskMeta}>
          <Text style={styles.taskAssignee}>{task.assignee}</Text>
          <Text style={styles.taskDueDate}>{task.dueDate}</Text>
        </View>

        <View
          style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {task.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const TaskManagerApp: React.FC = () => {
  const { show } = useToast();

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filteredTasks = useMemo(() => {
    if (selectedFilter === "All") return tasks;
    return tasks.filter(
      (task) =>
        task.status === selectedFilter || task.priority === selectedFilter
    );
  }, [tasks, selectedFilter]);

  const createToast = useCallback(
    (type: string, task?: Task) => {
      const toastConfigs = {
        task_created: {
          icon: "plus.circle.fill",
          color: "#10B981",
          title: "Task Created",
          description: "New task added to your board",
        },
        task_completed: {
          icon: "checkmark.circle.fill",
          color: "#10B981",
          title: "Task Completed! 🎉",
          description: task ? `${task.title} marked as done` : "Task completed",
        },
        task_assigned: {
          icon: "person.badge.plus",
          color: "#3B82F6",
          title: "Task Assigned",
          description: task ? `Assigned to ${task.assignee}` : "Task assigned",
        },
        deadline_reminder: {
          icon: "clock.badge.exclamationmark",
          color: "#F59E0B",
          title: "Deadline Reminder",
          description: "3 tasks due tomorrow",
        },
        sync_success: {
          icon: "arrow.triangle.2.circlepath",
          color: "#10B981",
          title: "Sync Complete",
          description: "All changes saved to cloud",
        },
        team_notification: {
          icon: "bell.badge",
          color: "#8B5CF6",
          title: "Team Update",
          description: "Sarah completed 3 tasks",
        },
        priority_changed: {
          icon: "exclamationmark.triangle.fill",
          color: "#EF4444",
          title: "Priority Updated",
          description: task
            ? `Task marked as ${task.priority}`
            : "Priority changed",
        },
      };

      const config = toastConfigs[type as keyof typeof toastConfigs];
      if (!config) return;

      const toastContent = (
        <View style={styles.toastContent}>
          <SymbolView
            name={config.icon as SFSymbol}
            size={20}
            tintColor={config.color}
          />
          <View style={styles.toastTextContainer}>
            <Text style={styles.toastTitle}>{config.title}</Text>
            <Text style={styles.toastDescription}>{config.description}</Text>
          </View>
        </View>
      );

      const options: any = { position: "bottom", duration: 3000 };

      if (type === "task_completed" && task) {
        options.action = {
          label: "Undo",
          onPress: () => handleTaskAction("undo", task),
        };
        options.duration = 4000;
      }

      show(toastContent, options);
    },
    [show]
  );

  const handleTaskAction = useCallback(
    (action: string, task: Task) => {
      switch (action) {
        case "complete":
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id ? { ...t, status: "Done" as const } : t
            )
          );
          createToast("task_completed", task);

          break;

        case "assign":
          createToast("task_assigned", task);
          break;

        case "priority":
          const newPriority = task.priority === "Low" ? "High" : "Low";
          const updatedTask = { ...task, priority: newPriority };
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id ? { ...t, priority: newPriority } : t
            )
          );
          createToast("priority_changed", updatedTask as Task);
          break;

        case "undo":
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id ? { ...t, status: "In Progress" as const } : t
            )
          );
          break;
      }
    },
    [createToast]
  );

  const handleQuickAction = useCallback(
    (actionType: string) => {
      createToast(actionType);

      if (actionType === "deadline_reminder") {
        setTimeout(() => setSelectedFilter("Urgent"), 1000);
      }
    },
    [createToast]
  );

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter(filter);
  }, []);

  const handleProfilePress = useCallback(() => {
    createToast("sync_success");
  }, [createToast]);

  const renderProject = useCallback(
    ({ item }: { item: Project }) => <ProjectCard project={item} />,
    []
  );

  const renderTask = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard task={item} onTaskAction={handleTaskAction} />
    ),
    [handleTaskAction]
  );

  const renderQuickAction = useCallback(
    ({ item }: { item: QuickAction }) => (
      <QuickActionButton action={item} onPress={handleQuickAction} />
    ),
    [handleQuickAction]
  );

  const keyExtractorProject = useCallback(
    (item: Project) => `project-${item.id}`,
    []
  );
  const keyExtractorTask = useCallback((item: Task) => `task-${item.id}`, []);
  const keyExtractorAction = useCallback((item: QuickAction) => item.id, []);

  return (
    <React.Fragment>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#09090B" />

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good morning rit3zh</Text>
              <Text style={styles.userName}>Let's get things done</Text>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              onPress={handleProfilePress}
              activeOpacity={0.8}
            >
              <SymbolView name="person.circle" size={24} tintColor="#FAFAFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          scrollEnabled
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Projects</Text>
            <FlatList
              data={PROJECTS_DATA}
              renderItem={renderProject}
              keyExtractor={keyExtractorProject}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.projectsList}
              removeClippedSubviews={false}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <FlatList
              data={QUICK_ACTIONS}
              renderItem={renderQuickAction}
              keyExtractor={keyExtractorAction}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.actionsList}
              removeClippedSubviews={false}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersList}
            >
              {FILTER_OPTIONS.map((filter) => (
                <FilterButton
                  key={filter}
                  title={filter}
                  isActive={selectedFilter === filter}
                  onPress={handleFilterChange}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.tasksSection}>
            <FlatList
              data={filteredTasks}
              renderItem={renderTask}
              keyExtractor={keyExtractorTask}
              scrollEnabled={false}
              removeClippedSubviews={false}
              contentContainerStyle={styles.tasksList}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

const TaskManagerWithToast: React.FC = () => (
  <ToastProviderWithViewport>
    <TaskManagerApp />
  </ToastProviderWithViewport>
);

export default TaskManagerWithToast;
