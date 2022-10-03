class AddDateTimeToTrainingAppointments < ActiveRecord::Migration[6.1]
  def change
    add_column :training_appointments, :date_time, :datetime
  end
end
