import { sqliteTable, text, integer, primaryKey, unique, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
})

export const workouts = sqliteTable('workouts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
})

export const routines = sqliteTable('routines', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
})

export const workoutLogs = sqliteTable('workout_logs', {
  id: integer('id').primaryKey({autoIncrement: true}),
  workoutId: integer('workout_id').references(() => workouts.id),
  timestamp: integer('timestamp', { mode: 'timestamp_ms' }).notNull(),
  notes: text('notes'),
});

export const performedSets = sqliteTable('performed_sets', {
  id: integer('id').primaryKey({autoIncrement: true}),
  workoutLogId: integer('workout_log_id').notNull().references(() => workoutLogs.id, { onDelete: 'cascade' }),
  exerciseId: integer('exercise_id').notNull().references(() => exercises.id),
  setNumber: integer('set_number').notNull(),
  reps: integer('reps').notNull(),
  weight: real('weight').notNull().default(0),
});

export const workoutsToExercises = sqliteTable(`workouts_to_exercises`, {
  id: integer('id').primaryKey({autoIncrement: true}),
  exerciseId: integer('exercise_id').notNull().references(() => exercises.id,  { onDelete: 'cascade' }),
  workoutId: integer('workout_id').notNull().references(() => workouts.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(),
  supersetId: integer('superset_id'),
  reps: integer('reps').default(0),
}, (t) => [
  unique().on(t.exerciseId, t.workoutId)

])

export const routinesToWorkouts = sqliteTable('routines_to_workouts', {
  workoutId: integer('workout_id').notNull().references(() => workouts.id),
  routineId: integer('routine_id').notNull().references(() => routines.id),
  order: integer('order').notNull()
}, (t) => [
  primaryKey({ columns: [t.workoutId, t.routineId]})
])


export const exercisesRelations = relations(exercises, ({many}) => ({
  workouts: many(workoutsToExercises)
}))

export const workoutsRelations = relations(workouts, ({many}) => ({
  exercises: many(workoutsToExercises),
  routines: many(routinesToWorkouts)
}))

export const routinesRelations = relations(routines, ({many}) => ({
  workouts: many(routinesToWorkouts)
}))

export const performedSetsRelations = relations(performedSets, ({ one }) => ({
  workoutLog: one(workoutLogs, { fields: [performedSets.workoutLogId], references: [workoutLogs.id] }),
  exercise: one(exercises, { fields: [performedSets.exerciseId], references: [exercises.id] }),
}));

export const workoutLogsRelations = relations(workoutLogs, ({ many }) => ({
  performedSets: many(performedSets),
}));

export const workoutsToExercisesRelations = relations(workoutsToExercises, ({one}) => ({
  exercise: one(exercises, {
    fields: [workoutsToExercises.exerciseId],
    references: [exercises.id],
  }),
  workout: one(workouts, {
    fields: [workoutsToExercises.workoutId],
    references: [workouts.id]
  }),
}))

export const routinesToWorkoutsRelations = relations(routinesToWorkouts, ({one}) => ({
  workout: one(workouts, {
    fields: [routinesToWorkouts.workoutId],
    references: [workouts.id],
  }),
  routine: one(routines, {
    fields: [routinesToWorkouts.routineId],
    references: [routines.id]
  }),
}))

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
})

export const recipes = sqliteTable('recipes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
})