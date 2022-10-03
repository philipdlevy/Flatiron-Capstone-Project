class RemoveDateFromTrainingAppointments < ActiveRecord::Migration[6.1]
  def change
    remove_column :training_appointments, :date
  end
end
