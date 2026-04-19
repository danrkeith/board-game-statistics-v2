package com.board_game_statistics.api.groups;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class GroupServiceTests {
    private static final String[] TEST_GROUP_NAMES = {
            "Test group 1",
            "Test group 2",
            "Test group 3"
    };

    @Autowired
    private GroupService groupService;
    @Autowired
    private GroupRepository groupRepository;

    @BeforeEach
    void beforeEach() {
        for (String groupName : TEST_GROUP_NAMES) {
            Group group = new Group().setName(groupName);
            groupRepository.save(group);
        }
    }

    @Test
    void getGroups() {
        List<Group> groups = groupService.getGroups();

        Assertions.assertEquals(TEST_GROUP_NAMES.length, groups.size());
        for (int i = 0; i < TEST_GROUP_NAMES.length; i++) {
            Assertions.assertEquals(TEST_GROUP_NAMES[i], groups.get(i).getName());
        }
    }

    @Test
    void createGroup() {
        String groupName = "Test group 4";
        groupService.createGroup(groupName);

        Assertions.assertEquals(TEST_GROUP_NAMES.length + 1, groupService.getGroups().size());
        Assertions.assertEquals(groupName, groupService.getGroups().get(TEST_GROUP_NAMES.length).getName());
    }

    @Test
    void getGroup() {
        List<Group> groups = groupService.getGroups();
        Group group = groups.getFirst();

        Group verifyGroup = groupService.getGroup(group.getId());
        Assertions.assertEquals(group, verifyGroup);
    }

    @Test
    void editGroup() {
        long groupId = 1;
        String groupName = "Edited test group 1";

        Group beforeGroup = groupService.getGroup(groupId);
        Assertions.assertEquals(groupId, beforeGroup.getId());
        Assertions.assertEquals(TEST_GROUP_NAMES[0], beforeGroup.getName());

        Group afterGroup = groupService.editGroup(groupId, groupName);
        Group verifyAfterGroup = groupService.getGroup(groupId);

        Assertions.assertEquals(groupId, afterGroup.getId());
        Assertions.assertEquals(groupName, afterGroup.getName());
        Assertions.assertEquals(afterGroup, verifyAfterGroup);
    }

    @Test
    void deleteGroup() {
        List<Group> groupsBeforeDelete = groupService.getGroups();

        Assertions.assertEquals(TEST_GROUP_NAMES.length, groupsBeforeDelete.size());

        groupService.deleteGroup(groupsBeforeDelete.getFirst().getId());
        List<Group> groupsAfterDelete = groupService.getGroups();

        Assertions.assertEquals(TEST_GROUP_NAMES.length - 1, groupsAfterDelete.size());
    }
}
