class TrainingAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :date, :time

  belongs_to :user
  belongs_to :trainer
end
