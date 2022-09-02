class CreateTrainingAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :training_appointments do |t|
      t.date :date
      t.time :time

      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :trainer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
