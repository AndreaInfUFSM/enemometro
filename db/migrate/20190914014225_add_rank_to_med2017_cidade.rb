class AddRankToMed2017Cidade < ActiveRecord::Migration[5.2]
  def change
    add_column :med2017_cidades, :rank, :integer
  end
end
