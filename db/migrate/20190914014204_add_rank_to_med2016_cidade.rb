class AddRankToMed2016Cidade < ActiveRecord::Migration[5.2]
  def change
    add_column :med2016_cidades, :rank, :integer
  end
end
