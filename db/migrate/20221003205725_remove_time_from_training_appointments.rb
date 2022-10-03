class RemoveTimeFromTrainingAppointments < ActiveRecord::Migration[6.1]
  def change
    remove_column :training_appointments, :time
  end
end
