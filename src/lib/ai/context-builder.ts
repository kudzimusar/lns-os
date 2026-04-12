import { AIContextPayload, UserRole } from "@/types/ai";

/**
 * Utility to build the AI context payload from the current application state.
 * This is used to provide Claude with the situational awareness it needs.
 */
export const buildAIContext = (
  user: { id: string; name: string; role: UserRole; language: string },
  page: { route: string; title: string; description?: string },
  data: any = {},
  schoolConfig: any = {}
): AIContextPayload => {
  return {
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      language: user.language || 'en'
    },
    page: {
      route: page.route,
      title: page.title,
      description: page.description || `Viewing ${page.title}`
    },
    pageData: {
      students: data.students || [],
      grades: data.grades || [],
      attendance: data.attendance || [],
      assignments: data.assignments || [],
      behaviour: data.behaviour || [],
      selectedStudent: data.selectedStudent || null,
      selectedAssignment: data.selectedAssignment || null,
      ...data
    },
    school: {
      name: schoolConfig.name || 'Lennon Nash Academy',
      gradingSystem: schoolConfig.gradingSystem || [],
      citizenshipScale: schoolConfig.citizenshipScale || ['Gold', 'Silver', 'Bronze'],
      currentTerm: schoolConfig.currentTerm || 'Term 3',
      currentWeek: schoolConfig.currentWeek || 8
    },
    task: {
      type: 'insight',
      instruction: 'Provide actionable insights based on the current data.',
      outputFormat: 'json'
    }
  };
};
