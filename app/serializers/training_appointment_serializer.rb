require 'pry'

class TrainingAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :trainerName

  belongs_to :user
  belongs_to :trainer

  def trainerName
    # binding.pry
    trainer = Trainer.find(self.object.trainer_id)
    {id: trainer.id, name: trainer.name}
  end
end
