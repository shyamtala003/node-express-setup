import SendResponse from '../../../utils/sendResponse.util.js';
import personsModel from '../persons.model.js';

export default async function getAllPerson(req, res) {
  try {
    // const findPersons = await personsModel.find({});

    // 1. $match Stage ex-1
    // const findPersons = await personsModel.aggregate([
    //   { $match: { eyeColor: 'green' } }
    // ]);

    // 1. $match Stage ex-2 on subfields
    // const findPersons = await personsModel.aggregate([
    //   { $match: { 'company.location.country': 'Italy' } }
    // ]);

    // 1. $match Stage ex-3 with operators $gt operator
    // const findPersons = await personsModel.aggregate([
    //   { $match: { age: { $gt: 30 } } }
    // ]);

    // 1. $match Stage ex-4 with operators $lt operator
    // const findPersons = await personsModel.aggregate([
    //   { $match: { age: { $lt: 30 } } }
    // ]);

    // 1. $match Stage ex-5 match multiple conditions
    // const findPersons = await personsModel.aggregate([
    //   { $match: { age: { $gt: 20, $lt: 30 } } }
    // ]);

    // 1. $match Stage ex-5 with $size operator
    // const findPersons = await personsModel.aggregate([
    //   { $match: { tags: { $size: 5 } } }
    // ]);

    // 2. $group Stage ex-1
    // const findPersons = await personsModel.aggregate([
    //   { $group: { _id: '$gender' } }
    // ]);

    // 2. $group Stage ex-2 with nested fields
    // const findPersons = await personsModel.aggregate([
    //   { $group: { _id: '$company.location.country' } }
    // ]);

    // 2. $group Stage ex-3 with multiple fields
    // const findPersons = await personsModel.aggregate([
    //   { $group: { _id: { age: '$age', gender: '$gender' } } }
    // ]);

    // 3. combine $match and $group ex-1
    // const findPersons = await personsModel.aggregate([
    //   { $match: { gender: 'female' } },
    //   { $group: { _id: { age: '$age', country: '$company.location.country' } } }
    // ]);

    // 3. combine $group and $match ex-2
    // const findPersons = await personsModel.aggregate([
    //   {
    //     $group: {
    //       _id: { gender: '$gender', country: '$company.location.country' }
    //     }
    //   },
    //   { $match: { '_id.gender': 'female' } }
    // ]);

    // 4. how to count aggregated documents using different methods (I have around 1000 docs in DB)

    // 4.1 using $count stage : Took: 0.005 seconds(server slide count)
    // const findPersons = await personsModel.aggregate([{ $count: 'total' }]);

    // 4.2 using $count stage : Took: 0.005 seconds(server slide count)
    // const findPersons = await personsModel.find({}).countDocuments();

    // 4.3 count length using client backend server side code : Took: 0.050 seconds
    // const findPersons = await personsModel.find({});
    // const length = findPersons.length;

    // 5.1 sort stage ex-1
    // const findPersons = await personsModel.aggregate([{ $sort: { age: 1 } }]);

    // 5.2 sort stage ex-2
    // const findPersons = await personsModel.aggregate([
    //   { $sort: { name: 1, gender: 1 } }
    // ]);

    // 6.1 project stage ex-1
    // const findPersons = await personsModel.aggregate([
    //   { $project: { name: 1, gender: 1 } }
    // ]);

    // 6.2 project stage ex-2
    // const findPersons = await personsModel.aggregate([
    //   { $project: { name: 0, gender: 0, _id: 0 } }
    // ]);

    // 6.3 project stage ex-3 rename
    // const findPersons = await personsModel.aggregate([
    //   { $project: { fullName: '$name' } }
    // ]);

    // 7.1 limit stage
    // const findPersons = await personsModel.aggregate([{ $limit: 5 }]);

    // 7.2 limit stage
    // const findPersons = await personsModel.aggregate([
    //   { $limit: 5 },
    //   { $match: { gender: 'female' } }
    // ]);

    // 8. unwind stage
    // const findPersons = await personsModel.aggregate([
    //   { $unwind: '$tags' },
    //   { $project: { fullName: '$name', tags: 1 } }
    // ]);

    // 9. $sum operator
    // const findPersons = await personsModel.aggregate([
    //   { $unwind: '$tags' },
    //   { $group: { _id: '$tags', count: { $sum: 1 } } }
    // ]);

    // 10. $avg operator
    // const findPersons = await personsModel.aggregate([
    //   {
    //     $group: {
    //       _id: '$company.location.country',
    //       averageAge: { $avg: '$age' }
    //     }
    //   }
    // ]);

    // 11. $type unary operator which returns datatype
    const findPersons = await personsModel.aggregate([
      {
        $project: {
          ageType: { $type: '$age' },
          tagsType: { $type: '$tags' },
          companyType: { $type: '$company' }
        }
      }
    ]);

    // 12. $out stage which store out results into new mongoDB collection
    // const findPersons = await personsModel.aggregate([
    //   {
    //     $project: {
    //       ageType: { $type: '$age' },
    //       tagsType: { $type: '$tags' },
    //       companyType: { $type: '$company' }
    //     }
    //   },
    //   {
    //     $out: 'outputCollection'
    //   }
    // ]);

    return SendResponse(res, 200, true, 'Persons retrieved successfully', {
      findPersons
    });
  } catch (err) {
    console.error('Error:', err);
    return SendResponse(res, 500, false, err.message);
  }
}
